import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import Reveal from "@/components/Reveal";

// Bangkok districts, nearest the Nong Khaem factory first
const bangkok: [th: string, roman: string][] = [
  ["หนองแขม", "Nong Khaem"],
  ["บางแค", "Bang Khae"],
  ["ภาษีเจริญ", "Phasi Charoen"],
  ["บางบอน", "Bang Bon"],
  ["บางขุนเทียน", "Bang Khun Thian"],
  ["จอมทอง", "Chom Thong"],
  ["ทวีวัฒนา", "Thawi Watthana"],
  ["ตลิ่งชัน", "Taling Chan"],
  ["ราษฎร์บูรณะ", "Rat Burana"],
  ["ทุ่งครุ", "Thung Khru"],
];

// Provinces we deliver to on a regular run
const upcountry: [th: string, roman: string][] = [
  ["สมุทรสาคร", "Samut Sakhon"],
  ["นครปฐม", "Nakhon Pathom"],
  ["สมุทรปราการ", "Samut Prakan"],
  ["นนทบุรี", "Nonthaburi"],
  ["ปทุมธานี", "Pathum Thani"],
  ["พระนครศรีอยุธยา", "Ayutthaya"],
  ["ราชบุรี", "Ratchaburi"],
  ["ชลบุรี", "Chonburi"],
  ["ระยอง", "Rayong"],
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.areas" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/service-areas"),
  };
}

export default async function ServiceAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("areas");
  const l = locale as Locale;

  // Thai script for Thai readers, romanised place names everywhere else
  const name = ([th, roman]: [string, string]) => (l === "th" ? th : roman);

  const group = (
    items: [string, string][],
    title: string,
    note: string,
    delay: number,
  ) => (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-extrabold text-forest-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{note}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((a) => (
            <li
              key={a[1]}
              className="rounded-full bg-forest-50 px-4 py-1.5 text-sm font-semibold text-forest-800"
            >
              {name(a)}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );

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
          <p className="mt-6 text-sm text-slate-400">{company.address[l]}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
          {group(bangkok, t("bkkTitle"), t("bkkNote"), 0)}
          {group(upcountry, t("upcTitle"), t("upcNote"), 120)}
        </div>
      </section>

      <section className="thai-weave-light bg-forest-50/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-100 bg-white p-8">
              <h2 className="text-lg font-extrabold text-forest-950">
                {t("farTitle")}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {t("farText")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-slate-100 bg-white p-8">
              <h2 className="text-lg font-extrabold text-forest-950">
                {t("visitTitle")}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {t("visitText")}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {company.contacts.map((c) => (
                  <a
                    key={c.phone}
                    href={`tel:${c.phone.replace(/-/g, "")}`}
                    className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-forest-800"
                  >
                    {c.phone}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <Link
            href="/quote"
            className="inline-block rounded-full bg-forest-700 px-8 py-3.5 font-bold text-white transition hover:bg-forest-800"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
