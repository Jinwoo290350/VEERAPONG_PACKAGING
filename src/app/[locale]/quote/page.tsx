import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { company } from "@/data/company";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.quote" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/quote"),
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");

  const factors = [1, 2, 3, 4, 5, 6] as const;
  const prepare = [1, 2, 3, 4, 5] as const;
  const steps = [1, 2, 3, 4] as const;

  return (
    <>
      <section className="thai-weave bg-forest-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* What moves the price */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("factorsTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {factors.map((f, i) => (
              <Reveal key={f} delay={i * 80}>
                <div className="h-full rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <p className="text-4xl font-black text-amber-500/30">
                    0{f}
                  </p>
                  <h3 className="mt-2 font-bold text-forest-900">
                    {t(`f${f}`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`f${f}d`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to send us */}
      <section className="thai-weave-light bg-forest-50/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("prepareTitle")}
            </h2>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {prepare.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <li className="flex gap-4 rounded-xl border border-slate-100 bg-white p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-700 text-xs font-bold text-white">
                    {p}
                  </span>
                  <span className="leading-relaxed text-slate-600">
                    {t(`p${p}`)}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={400}>
            <p className="mt-6 text-sm text-slate-500">{t("prepareNote")}</p>
          </Reveal>
        </div>
      </section>

      {/* Enquiry to delivery */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("stepsTitle")}
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 100}>
                <li className="h-full rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 font-bold text-white">
                    {s}
                  </span>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {t(`s${s}`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
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
            <a
              href={company.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-6 py-3 font-bold transition hover:bg-white/20"
            >
              LINE {company.lineId}
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3.5 font-bold text-white transition hover:bg-amber-600"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
