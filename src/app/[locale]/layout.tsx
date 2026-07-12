import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FloatingLine from "@/components/FloatingLine";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(company.siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${company.shortName.en}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: company.shortName.en,
      title: t("title"),
      description: t("description"),
      locale,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansThai.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <JsonLd locale={locale as Locale} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingLine />
          <ChatWidget locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
