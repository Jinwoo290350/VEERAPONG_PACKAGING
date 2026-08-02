import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, type Locale } from "@/i18n/routing";
import { company } from "@/data/company";
import { localeAlternates } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingLine from "@/components/FloatingLine";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

// The chat panel is opened by a minority of visitors — keep its JS out of the
// initial payload on all 50 pages.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"));

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"], // Latin glyphs come from Inter
  weight: ["400", "600", "700", "800"],
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
    // Home page only — every other route declares its own via localeAlternates
    alternates: localeAlternates(locale),
    openGraph: {
      type: "website",
      siteName: company.shortName.en,
      title: t("title"),
      description: t("description"),
      locale,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: company.name.en }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
