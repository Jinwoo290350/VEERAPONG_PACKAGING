"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({ locale }: { locale: Locale }) {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12), locale }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const current = acc;
        setMessages([...history, { role: "assistant", content: current }]);
      }
      if (!acc.trim()) throw new Error("empty response");
    } catch {
      setMessages([...history, { role: "assistant", content: t("error") }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("buttonLabel")}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-lg shadow-navy-950/20 transition hover:scale-105 hover:bg-gold-400"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.7 5.6-.1 1-.5 2.1-1.3 3.1-.2.2 0 .6.3.6 1.8-.1 3.3-.7 4.4-1.5.9.3 1.9.4 2.9.4 5 0 9-3.6 9-8.1S17 3 12 3z"
              fill="currentColor"
            />
            <circle cx="8.5" cy="11" r="1.2" fill="#fdf8ec" />
            <circle cx="12" cy="11" r="1.2" fill="#fdf8ec" />
            <circle cx="15.5" cy="11" r="1.2" fill="#fdf8ec" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(560px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-navy-950 px-5 py-4 text-white">
            <p className="font-bold">{t("title")}</p>
            <p className="text-xs text-slate-300">{t("subtitle")}</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant" content={t("greeting")} />
            {messages.map((m, i) => (
              <Bubble
                key={i}
                role={m.role}
                content={m.content || (busy && i === messages.length - 1 ? t("thinking") : "")}
              />
            ))}
          </div>

          <div className="border-t border-slate-100 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder={t("placeholder")}
                className="max-h-28 flex-1 resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-gold-500"
              />
              <button
                type="button"
                onClick={send}
                disabled={busy || !input.trim()}
                className="rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-navy-800 disabled:opacity-40"
              >
                {t("send")}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">{t("disclaimer")}</p>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: Message) {
  if (!content) return null;
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`chat-bubble max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          role === "user"
            ? "rounded-br-sm bg-navy-900 text-white"
            : "rounded-bl-sm bg-slate-100 text-slate-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
