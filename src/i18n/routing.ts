import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "en", "ja", "zh"],
  defaultLocale: "th",
});

export type Locale = (typeof routing.locales)[number];
