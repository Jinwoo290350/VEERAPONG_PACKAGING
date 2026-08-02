import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "en", "ja", "zh"],
  defaultLocale: "th",
  // Don't sniff Accept-Language: the audience is Thai, every URL is already
  // locale-prefixed, and skipping detection keeps middleware responses
  // cacheable at the edge (lower TTFB). Visitors switch language in the navbar.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
