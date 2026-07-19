import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { productCategories } from "@/data/products";
import { yearsInBusiness } from "@/data/company";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

// Product photos sliding in the marquee under the hero
const marqueeSlugs = ["pp-board", "bubble", "boxes", "film-tape", "custom"];
const marqueeImages: Record<string, string> = {
  custom: "/photos/custom.jpg", // custom's card uses an illustration; marquee uses its photo
};

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

  const marqueeItems = marqueeSlugs
    .map((slug) => productCategories.find((c) => c.slug === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({
      slug: c.slug,
      name: c.name[l],
      image: marqueeImages[c.slug] ?? c.image,
      accent: c.accent,
    }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5].map((n) => ({
      "@type": "Question",
      name: t(`faq.q${n}`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.a${n}`) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <Image
          src="/photos/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-900/50"
        />
        <div aria-hidden="true" className="thai-weave absolute inset-0" />
        {/* vivid colour glows */}
        <div aria-hidden="true" className="absolute -left-24 top-6 h-96 w-96 rounded-full bg-gold-500/25 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-4rem] top-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-3rem] left-1/3 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {t("hero.badge")}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-gold-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>{" "}
              {t("hero.titleEnd")}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10 bg-navy-950/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 lg:grid-cols-4">
            {[
              [`${yearsInBusiness}+`, t("hero.statYears"), "from-gold-300 to-orange-400"],
              ["100+", t("hero.statClients"), "from-sky-300 to-cyan-400"],
              ["6", t("hero.statCategories"), "from-emerald-300 to-teal-400"],
              ["100%", t("hero.statDelivery"), "from-rose-300 to-pink-400"],
            ].map(([num, label, grad]) => (
              <div key={label}>
                <p className={`bg-gradient-to-r ${grad} bg-clip-text text-3xl font-extrabold text-transparent`}>
                  {num}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sliding product showcase ─────────────────────── */}
      <section className="border-b border-slate-100 bg-white py-10">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} aria-hidden={half === 1} className="flex gap-6 pr-6">
                {marqueeItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    tabIndex={half === 1 ? -1 : undefined}
                    className={`group shrink-0 rounded-[20px] bg-gradient-to-br p-[3px] shadow-lg ${item.accent}`}
                  >
                    <span className="relative block h-44 w-64 overflow-hidden rounded-[17px] sm:h-52 sm:w-80">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="20rem"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2.5 left-3 rounded-full bg-navy-950/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                        {item.name}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
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

      {/* ── How we work (4-step process) ─────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              {t("process.title")}
            </h2>
            <p className="mt-3 text-slate-500">{t("process.subtitle")}</p>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {([1, 2, 3, 4] as const).map((n, i) => (
              <Reveal key={n} delay={i * 120}>
                <li className="relative">
                  {i < 3 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-14 top-7 hidden h-0.5 w-[calc(100%-2rem)] bg-gradient-to-r from-gold-400 to-transparent lg:block"
                    />
                  )}
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-xl font-black text-gold-400 shadow-lg shadow-navy-950/20">
                    {n}
                  </span>
                  <h3 className="mt-5 font-bold text-navy-900">
                    {t(`process.step${n}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`process.step${n}Desc`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
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

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="thai-weave-light bg-navy-50/50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              {t("faq.title")}
            </h2>
            <p className="mt-3 text-slate-500">{t("faq.subtitle")}</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <details
                key={n}
                className="group rounded-2xl border border-slate-100 bg-white shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {t(`faq.q${n}`)}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    className="shrink-0 text-gold-600 transition group-open:rotate-180"
                  >
                    <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  {t(`faq.a${n}`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950">
        <Image
          src="/photos/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div aria-hidden="true" className="thai-weave absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
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
