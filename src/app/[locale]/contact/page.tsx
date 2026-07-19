import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const l = locale as Locale;

  const infoRows: {
    title: string;
    lines: { text: string; href?: string }[];
    icon: string;
  }[] = [
    {
      title: t("addressTitle"),
      lines: [{ text: company.address[l] }],
      icon: "M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    },
    {
      title: t("phoneTitle"),
      lines: company.contacts.map((c) => ({
        text: `${c.phone} · ${c.name[l]}`,
        href: `tel:${c.phone.replace(/-/g, "")}`,
      })),
      icon: "M4 4h5l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v5a2 2 0 01-2 2A16 16 0 012 6a2 2 0 012-2z",
    },
    {
      title: t("emailTitle"),
      lines: company.emails.map((e) => ({ text: e, href: `mailto:${e}` })),
      icon: "M3 6h18v12H3V6zM3 7l9 6 9-6",
    },
    {
      title: t("lineTitle"),
      lines: [{ text: company.lineId, href: company.lineUrl }],
      icon: "M12 4C7 4 3 7.3 3 11.4c0 3.7 3.2 6.7 7.5 7.3.3 0 .7.2.8.5l.2 1.6c0 .5.5.7.9.5 2.4-1.4 6-4.1 7.6-6.4 1-1.3 1.5-2.7 1.5-3.5C21.5 7.3 17 4 12 4z",
    },
    {
      title: t("hoursTitle"),
      lines: [{ text: t("hours") }],
      icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2",
    },
  ];

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
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-extrabold text-navy-950">
              {t("formTitle")}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-navy-950">
              {t("infoTitle")}
            </h2>
            <ul className="mt-6 space-y-5">
              {infoRows.map((row) => (
                <li key={row.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d={row.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{row.title}</p>
                    {row.lines.map((line) =>
                      line.href ? (
                        <a
                          key={line.text}
                          href={line.href}
                          className="block text-sm text-slate-600 transition hover:text-gold-600"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="text-sm text-slate-600">
                          {line.text}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* LINE QR — scan to add */}
            <a
              href={company.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-5 rounded-2xl border border-[#06C755]/30 bg-[#06C755]/5 p-4 transition hover:border-[#06C755]/60"
            >
              <Image
                src="/line-qr.png"
                alt={`LINE QR — ${company.lineId}`}
                width={112}
                height={112}
                className="h-28 w-28 shrink-0 rounded-xl border border-slate-100 bg-white"
              />
              <div>
                <p className="font-bold text-navy-900">{t("lineQr")}</p>
                <p className="mt-1 text-sm text-slate-500">LINE ID: {company.lineId}</p>
              </div>
            </a>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <iframe
                title={t("mapTitle")}
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.address.en)}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
