import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getCategory, productCategories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Showcase3D, { type ShowcaseVariant } from "@/components/Showcase3D";
import ProductGallery from "@/components/ProductGallery";

// Categories with an interactive 3D model in the header instead of a photo
const showcaseVariants: Record<string, ShowcaseVariant> = {
  foam: "foam",
  "pp-board": "ppboard",
  bubble: "bubble",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productCategories.map((c) => ({ locale, category: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const l = locale as Locale;
  return {
    title: cat.name[l],
    description: `${cat.tagline[l]} — ${cat.description[l].slice(0, 140)}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const cat = getCategory(category);
  if (!cat) notFound();
  const t = await getTranslations("products");
  const tf = await getTranslations("featured");
  const tv = await getTranslations("viewer");
  const l = locale as Locale;
  const others = productCategories.filter((c) => c.slug !== cat.slug).slice(0, 3);
  // Only show gallery photos whose files actually exist in /public
  const galleryImages = (cat.gallery ?? []).filter((img) =>
    existsSync(path.join(process.cwd(), "public", img)),
  );

  return (
    <>
      {/* Header — light catalog style so the product photo stands out */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-forest-50/70 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <Link
              href="/products"
              className="text-sm font-semibold text-slate-500 transition hover:text-amber-600"
            >
              ← {t("backToProducts")}
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
              {cat.name[l]}
            </h1>
            <p className="mt-2 text-lg font-semibold text-forest-700">
              {cat.tagline[l]}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              {cat.description[l]}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block rounded-full bg-forest-700 px-7 py-3 font-bold text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-800"
            >
              {t("enquire")}
            </Link>
          </div>

          {/* Right side: interactive 3D model, or product photo in a clean frame */}
          <div className="w-full max-w-lg lg:justify-self-end">
            {showcaseVariants[cat.slug] ? (
              <Showcase3D
                variant={showcaseVariants[cat.slug]}
                labels={{
                  hint: tv("hint"),
                  explode: tv("explode"),
                  collapse: tv("collapse"),
                  caption: tv(`${showcaseVariants[cat.slug]}.caption`),
                  layers: [
                    tv(`${showcaseVariants[cat.slug]}.l1`),
                    tv(`${showcaseVariants[cat.slug]}.l2`),
                    tv(`${showcaseVariants[cat.slug]}.l3`),
                  ],
                }}
              />
            ) : (
              <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-xl shadow-forest-900/5">
                <div
                  className={`relative h-64 overflow-hidden rounded-2xl sm:h-80 ${
                    cat.isPhoto ? "bg-white" : `bg-gradient-to-br ${cat.accent}`
                  }`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name[l]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={
                      cat.isPhoto
                        ? `object-contain p-3 ${cat.darkPhoto ? "" : "mix-blend-multiply"}`
                        : "object-contain p-8"
                    }
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product photo carousel */}
      {galleryImages.length > 0 && (
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-forest-950 sm:text-3xl">
              {tv("galleryTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              {tv("gallerySubtitle")}
            </p>
            <div className="mt-8">
              <ProductGallery images={galleryImages} alt={cat.name[l]} />
            </div>
          </div>
        </section>
      )}

      {/* Items + specs */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-extrabold text-forest-950">
              {t("itemsTitle")}
            </h2>
            <div className="mt-6 space-y-4">
              {cat.items.map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                    <h3 className="font-bold text-forest-900">{item.name[l]}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.desc[l]}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold text-forest-950">
              {t("useCasesTitle")}
            </h2>
            <ul className="mt-5 space-y-3">
              {cat.useCases[l].map((u, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-amber-500"
                  >
                    <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <div className="bg-forest-950 px-6 py-4">
                <h2 className="font-bold text-white">{t("specsTitle")}</h2>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {cat.specs.map((s, i) => (
                    <tr key={i} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                      <th className="w-2/5 px-6 py-3.5 text-left align-top font-semibold text-forest-900">
                        {s.label[l]}
                      </th>
                      <td className="px-6 py-3.5 text-slate-600">{s.value[l]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-slate-100 bg-forest-50 px-6 py-4">
                <Link
                  href="/contact"
                  className="text-sm font-bold text-forest-700 transition hover:text-forest-800"
                >
                  {t("enquire")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-forest-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold text-forest-950">
            {t("otherCategories")}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <ProductCard
                key={c.slug}
                category={c}
                locale={l}
                exploreLabel={tf("explore")}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
