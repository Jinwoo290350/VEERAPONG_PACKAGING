import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ProductCategory } from "@/data/products";
import type { Locale } from "@/i18n/routing";

export default function ProductCard({
  category,
  locale,
  exploreLabel,
}: {
  category: ProductCategory;
  locale: Locale;
  exploreLabel: string;
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
    >
      <div className={`relative bg-gradient-to-br ${category.accent} p-6`}>
        <Image
          src={category.image}
          alt={category.name[locale]}
          width={400}
          height={240}
          className="h-36 w-full object-contain drop-shadow-md transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-navy-900">
          {category.name[locale]}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">
          {category.tagline[locale]}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 transition group-hover:gap-2.5">
          {exploreLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
