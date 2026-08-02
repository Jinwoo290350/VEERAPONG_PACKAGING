import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const l = locale as Locale;

  const milestones = [1, 2, 3, 4] as const;
  const values = [1, 2, 3] as const;

  return (
    <>
      <section className="thai-weave bg-forest-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("storyTitle")}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-slate-100 bg-forest-50/50 p-8">
              <h2 className="text-lg font-extrabold text-forest-950">
                {t("companyInfoTitle")}
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                {(
                  [
                    [t("regNoLabel"), company.regNo],
                    [t("foundedLabel"), t("foundedValue")],
                    [t("businessLabel"), t("businessValue")],
                    [t("addressLabel"), company.address[l]],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="border-b border-forest-100 pb-3 last:border-0">
                    <dt className="font-bold text-forest-900">{label}</dt>
                    <dd className="mt-1 text-slate-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="thai-weave-light bg-forest-50/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("timelineTitle")}
            </h2>
          </Reveal>
          <ol className="relative mt-12 space-y-10 border-l-2 border-amber-400/50 pl-8">
            {milestones.map((m, i) => (
              <Reveal key={m} delay={i * 100}>
                <li className="relative">
                  <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-amber-500 bg-white">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                  <p className="text-sm font-extrabold tracking-widest text-amber-600">
                    {t(`milestone${m}Year`)}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-slate-600">
                    {t(`milestone${m}`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="thai-weave h-full rounded-2xl bg-forest-950 p-8 text-white">
                <h2 className="text-lg font-extrabold text-amber-400">
                  {t("missionTitle")}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-200">{t("mission")}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 p-8 text-white">
                <h2 className="text-lg font-extrabold">{t("visionTitle")}</h2>
                <p className="mt-3 font-medium leading-relaxed">{t("vision")}</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 text-center">
            <h2 className="text-2xl font-extrabold text-forest-950 sm:text-3xl">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <p className="text-4xl font-black text-amber-500/30">0{v}</p>
                  <h3 className="mt-2 font-bold text-forest-900">{t(`value${v}`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`value${v}Desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
