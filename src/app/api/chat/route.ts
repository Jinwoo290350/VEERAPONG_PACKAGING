import { NextRequest } from "next/server";
import { company, yearsInBusiness } from "@/data/company";
import { productCategories } from "@/data/products";

export const runtime = "nodejs";

// Free models on OpenRouter, tried in order until one responds.
// Override with OPENROUTER_MODELS="model-a,model-b" if a model is retired.
// Instruct-tuned models first — reasoning models tend to leak their
// chain-of-thought into the reply on some free providers.
const DEFAULT_MODELS = [
  "google/gemma-4-26b-a4b-it:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "openai/gpt-oss-120b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
];

const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

// Simple in-memory rate limit: 20 requests / 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function buildSystemPrompt(locale: string) {
  const catalog = productCategories
    .map((c) => {
      const items = c.items.map((i) => `  - ${i.name.en} (${i.name.th}): ${i.desc.en}`).join("\n");
      const specs = c.specs.map((s) => `  - ${s.label.en}: ${s.value.en}`).join("\n");
      return `## ${c.name.en} (${c.name.th})\n${c.description.en}\nProducts:\n${items}\nSpecs:\n${specs}`;
    })
    .join("\n\n");

  return `You are the friendly AI assistant on the website of ${company.name.en} (${company.name.th}), an industrial packaging wholesaler in Bangkok, Thailand.

COMPANY FACTS
- Founded: 6 November 2007 (${yearsInBusiness}+ years in business). Registration no. ${company.regNo}.
- Business: wholesale of industrial packaging materials (TSIC 46694).
- Address: ${company.address.en} (Thai: ${company.address.th})
- Phone: ${company.phone} / ${company.mobile} · Email: ${company.email} · LINE: ${company.lineId}
- Hours: Mon–Sat 8:00–17:30 (Thailand time).
- Track record: supplies automotive parts packaging used within Toyota and Hitachi supply chains in Thailand (via tier suppliers), plus electronics, appliance, food, logistics and export customers.

PRODUCT CATALOG
${catalog}

RULES
- Answer in the language the visitor writes in. If ambiguous, use the website language: ${locale}.
- Be concise, warm and professional. Use Thai polite particles (ครับ) when answering in Thai.
- Only discuss the company, its products and industrial packaging advice. Politely decline unrelated topics.
- Never invent exact prices or promise delivery dates. For quotes, ask for part size/quantity and direct the visitor to the contact page, ${company.email}, or LINE ${company.lineId}.
- Keep answers under ~150 words unless the visitor asks for detail.
- Reply with the final answer only — never show your reasoning, notes or planning.`;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("OPENROUTER_API_KEY is not configured", { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_CHARS) }));

  if (!history.length || history[history.length - 1].role !== "user") {
    return new Response("No user message", { status: 400 });
  }

  const models = (process.env.OPENROUTER_MODELS ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const candidates = models.length ? models : DEFAULT_MODELS;

  const payload = {
    stream: true,
    // Keep chain-of-thought out of the response for reasoning models
    reasoning: { exclude: true },
    messages: [
      { role: "system", content: buildSystemPrompt(body.locale ?? "th") },
      ...history,
    ],
  };

  let upstream: Response | null = null;
  for (const model of candidates) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": company.siteUrl,
        "X-Title": "Veerapong Packaging Website",
      },
      body: JSON.stringify({ ...payload, model }),
    });
    if (res.ok && res.body) {
      upstream = res;
      break;
    }
    // Model unavailable / rate-limited — try the next one
    await res.body?.cancel();
  }

  if (!upstream?.body) {
    return new Response("All models unavailable", { status: 502 });
  }

  // Convert OpenRouter SSE into a plain text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta: string | undefined =
              json.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // partial JSON across chunks is handled by the line buffer;
            // ignore anything else malformed
          }
        }
      },
    }),
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
