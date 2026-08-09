import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";
import type { Locale } from "@/i18n/routing";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="thai-weave bg-forest-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-400">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            {(
              [
                ["/", "home"],
                ["/products", "products"],
                ["/industries", "industries"],
                ["/quote", "quote"],
                ["/service-areas", "areas"],
                ["/about", "about"],
                ["/contact", "contact"],
              ] as const
            ).map(([href, key]) => (
              <li key={key}>
                <Link href={href} className="transition hover:text-amber-400">
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-400">
            {t("productsTitle")}
          </h3>
          <ul className="space-y-2 text-sm">
            {productCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="transition hover:text-amber-400"
                >
                  {c.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-400">
            {t("contactTitle")}
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>{company.address[locale]}</li>
            <li>
              <a href={`tel:${company.phone.replace(/-/g, "")}`} className="transition hover:text-amber-400">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="transition hover:text-amber-400">
                {company.email}
              </a>
            </li>
            <li>LINE: {company.lineId}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>
            © {year} {company.name[locale]}. {t("rights")}
          </p>
          <p>
            {t("regNo")} {company.regNo}
          </p>
        </div>
      </div>
    </footer>
  );
}
