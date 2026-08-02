import { routing } from "@/i18n/routing";

/**
 * Canonical + hreflang for one page.
 *
 * Next merges `alternates` from the layout into every child route, so a layout
 * that declares `canonical: "/th"` makes every page claim to be a copy of the
 * locale home page — Google then drops them from the index. Each page must
 * therefore declare its own path.
 *
 * @param locale current locale
 * @param path   route below the locale segment, e.g. "" | "/about" | "/products/foam"
 */
export function localeAlternates(locale: string, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `/${l}${path}`]),
    ),
  };
}
