import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { productCategories } from "@/data/products";
import { yearsInBusiness } from "@/data/company";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const l = locale as Locale;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="thai-weave relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-navy-700/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 h-[400px] w-[400px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("hero.badge")}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>{" "}
              {t("hero.titleEnd")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-gold-500 px-7 py-3 font-bold text-navy-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400"
              >
                {t("hero.ctaProducts")}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/25 px-7 py-3 font-bold text-white transition hover:border-gold-400 hover:text-gold-300"
              >
                {t("hero.ctaContact")}
              </Link>
            </div>
          </div>

          {/* Isometric packaging illustration */}
          <div className="hidden justify-center lg:flex" aria-hidden="true">
            <svg width="420" height="360" viewBox="0 0 420 360" fill="none">
              <defs>
                <linearGradient id="boxTop" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#f6b83d" />
                  <stop offset="1" stopColor="#f0a421" />
                </linearGradient>
                <linearGradient id="boxSide" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#2b5892" />
                  <stop offset="1" stopColor="#1d3a62" />
                </linearGradient>
              </defs>
              {/* pallet */}
              <path d="M60 290l150 60 150-60-150-60-150 60z" fill="#122a4a" />
              <path d="M60 290v18l150 60v-18l-150-60z" fill="#0a1b33" />
              <path d="M360 290v18l-150 60v-18l150-60z" fill="#0e2340" />
              {/* big box */}
              <path d="M110 180l100 40v100l-100-40V180z" fill="url(#boxSide)" />
              <path d="M310 180l-100 40v100l100-40V180z" fill="#234677" />
              <path d="M110 180l100-40 100 40-100 40-100-40z" fill="url(#boxTop)" />
              <path d="M205 144l10-4 10 4v40l-10 4-10-4v-40z" fill="#fdf8ec" opacity="0.9" />
              {/* small box left */}
              <path d="M70 240l55 22v55l-55-22v-55z" fill="#1d3a62" />
              <path d="M180 240l-55 22v55l55-22v-55z" fill="#16304f" />
              <path d="M70 240l55-22 55 22-55 22-55-22z" fill="#5a8cc2" />
              {/* small box right */}
              <path d="M250 245l50 20v50l-50-20v-50z" fill="#b46f0b" />
              <path d="M350 245l-50 20v50l50-20v-50z" fill="#925a10" />
              <path d="M250 245l50-20 50 20-50 20-50-20z" fill="#f0a421" />
              {/* floating bubbles = protection */}
              <circle cx="90" cy="120" r="10" stroke="#5a8cc2" strokeWidth="3" opacity="0.5" />
              <circle cx="130" cy="80" r="6" stroke="#f0a421" strokeWidth="3" opacity="0.6" />
              <circle cx="330" cy="100" r="8" stroke="#5a8cc2" strokeWidth="3" opacity="0.5" />
              <circle cx="360" cy="140" r="5" stroke="#f0a421" strokeWidth="3" opacity="0.6" />
              {/* shield */}
              <path
                d="M210 30l34 12v26c0 22-14 39-34 46-20-7-34-24-34-46V42l34-12z"
                fill="#f0a421"
                opacity="0.95"
              />
              <path
                d="M196 70l10 10 20-22"
                stroke="#0a1b33"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10 bg-navy-950/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 lg:grid-cols-4">
            {[
              [`${yearsInBusiness}+`, t("hero.statYears")],
              ["100+", t("hero.statClients")],
              ["6", t("hero.statCategories")],
              ["100%", t("hero.statDelivery")],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-gold-400">{num}</p>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            {t("trust.title")}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{t("trust.subtitle")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
            <span className="text-3xl font-black tracking-widest text-slate-300 transition hover:text-navy-900">
              TOYOTA
            </span>
            <span className="text-3xl font-black tracking-widest text-slate-300 transition hover:text-navy-900">
              HONDA
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-400">{t("trust.note")}</p>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────── */}
      <section className="thai-weave-light bg-navy-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              {t("whyUs.title")}
            </h2>
            <p className="mt-3 text-slate-500">{t("whyUs.subtitle")}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["item1", WhyIcon1],
                ["item2", WhyIcon2],
                ["item3", WhyIcon3],
                ["item4", WhyIcon4],
              ] as const
            ).map(([key, Icon], i) => (
              <Reveal key={key} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon />
                  </div>
                  <h3 className="mt-4 font-bold text-navy-900">
                    {t(`whyUs.${key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`whyUs.${key}Desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                {t("featured.title")}
              </h2>
              <p className="mt-3 text-slate-500">{t("featured.subtitle")}</p>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-gold-600 transition hover:text-gold-700"
            >
              {t("featured.viewAll")} →
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 100}>
                <ProductCard
                  category={c}
                  locale={l}
                  exploreLabel={t("featured.explore")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="thai-weave bg-navy-950">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-gold-500 px-8 py-3.5 font-bold text-navy-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400"
              >
                {t("cta.button")}
              </Link>
              <p className="mt-4 text-sm text-slate-400">{t("cta.orChat")} 💬</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function WhyIcon1() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 3v6c0 5.2-3.4 9.3-8 11-4.6-1.7-8-5.8-8-11V5l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhyIcon2() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.5 4.5l5 5L8 21H3v-5L14.5 4.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 7l5 5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WhyIcon3() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1.5 6h13v11h-13V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14.5 10h4l3 3v4h-7v-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="6" cy="19" r="1.8" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="19" r="1.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WhyIcon4() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21h18M5 21V10l7-6 7 6v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-5a3 3 0 016 0v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
