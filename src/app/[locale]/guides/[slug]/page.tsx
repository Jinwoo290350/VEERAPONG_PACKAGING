import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import { guides } from "@/data/guides";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guides.map((g) => ({ locale, slug: g.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  const l = locale as Locale;
  return {
    title: guide.metaTitle[l],
    description: guide.metaDescription[l],
    alternates: localeAlternates(locale, `/guides/${slug}`),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const l = locale as Locale;
  const t = await getTranslations("quote");

  // The whole point of these pages is to answer a question Google is already
  // being asked, so the Q&A ships as FAQPage structured data too.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q[l],
      acceptedAnswer: { "@type": "Answer", text: f.a[l] },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="thai-weave bg-forest-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {guide.title[l]}
          </h1>
          <p className="mt-5 leading-relaxed text-slate-300">
            {guide.intro[l]}
          </p>
        </div>
      </section>

      {/* Thickness table */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {guide.tableTitle[l]}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <thead className="bg-forest-50">
                  <tr>
                    {[guide.colSpec, guide.colUse, guide.colNote].map((c) => (
                      <th
                        key={c.en}
                        className="px-5 py-4 font-extrabold text-forest-900"
                      >
                        {c[l]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((r) => (
                    <tr
                      key={r.spec.en}
                      className="border-t border-slate-100 align-top"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-5 py-4 font-bold text-forest-800"
                      >
                        {r.spec[l]}
                      </th>
                      <td className="px-5 py-4 text-slate-700">{r.use[l]}</td>
                      <td className="px-5 py-4 text-slate-500">{r.note[l]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Questions */}
      <section className="thai-weave-light bg-forest-50/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <dl className="space-y-4">
            {guide.faqs.map((f, i) => (
              <Reveal key={f.q.en} delay={i * 80}>
                <div className="rounded-2xl border border-slate-100 bg-white p-7">
                  <dt className="font-bold text-forest-900">{f.q[l]}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-600">
                    {f.a[l]}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="thai-weave bg-forest-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-slate-300">{t("ctaText")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {company.contacts.map((c) => (
              <a
                key={c.phone}
                href={`tel:${c.phone.replace(/-/g, "")}`}
                className="rounded-full bg-white/10 px-6 py-3 font-bold transition hover:bg-white/20"
              >
                {c.phone}
              </a>
            ))}
          </div>
          <Link
            href="/quote"
            className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3.5 font-bold text-white transition hover:bg-amber-600"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
