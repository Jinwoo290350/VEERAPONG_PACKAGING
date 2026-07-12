import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.industries" });
  return { title: t("title"), description: t("description") };
}

const sectors = [
  "electronics",
  "appliance",
  "food",
  "logistics",
  "export",
] as const;

const sectorIcons: Record<(typeof sectors)[number], string> = {
  electronics: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M6 6h12v12H6V6zM9.5 9.5h5v5h-5v-5z",
  appliance: "M6 2h12v20H6V2zM6 8h12M9 5h.01M9 12v4",
  food: "M5 3l1 9a3 3 0 003 3h6a3 3 0 003-3l1-9M4 3h16M10 15v6M14 15v6M8 21h8",
  logistics: "M3 7h13v10H3V7zM16 11h3l2 2.5V17h-5v-6zM7 20a1.8 1.8 0 100-3.6A1.8 1.8 0 007 20zM17.5 20a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z",
  export: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.4 4 5.5 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.5-4-9s1.5-6.6 4-9z",
};

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("industries");

  return (
    <>
      <section className="thai-weave bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          {/* Automotive — hero card */}
          <Reveal>
            <div className="thai-weave overflow-hidden rounded-3xl bg-navy-950 text-white">
              <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <span className="rounded-full bg-gold-500 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-navy-950">
                    {t("automotiveBadge")}
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold">
                    {t("automotiveTitle")}
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    {t("automotiveDesc")}
                  </p>
                  <div className="mt-6 flex gap-10 text-2xl font-black tracking-widest text-slate-500">
                    <span>TOYOTA</span>
                    <span>HONDA</span>
                  </div>
                </div>
                <div className="relative hidden h-64 overflow-hidden rounded-2xl ring-1 ring-white/15 lg:block">
                  <Image
                    src="/photos/automotive.jpg"
                    alt={t("automotiveTitle")}
                    fill
                    sizes="(max-width: 1024px) 0px, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other sectors */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 100}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d={sectorIcons[s]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">
                    {t(`${s}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`${s}Desc`)}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* CTA card */}
            <Reveal delay={200}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 p-7 text-navy-950">
                <h3 className="text-lg font-extrabold">{t("ctaTitle")}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  {t("ctaDesc")}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-block w-fit rounded-full bg-navy-950 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
                >
                  {t("ctaButton")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
