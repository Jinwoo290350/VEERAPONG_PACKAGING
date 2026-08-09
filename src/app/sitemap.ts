import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";

const staticPaths = [
  "",
  "/products",
  "/industries",
  "/quote",
  "/service-areas",
  "/about",
  "/contact",
];

// Photos to advertise per route, so the product shots can surface in Google Images
const imagesFor = (path: string): string[] => {
  if (path === "") return [`${company.siteUrl}/og.png`];
  if (path === "/products") {
    return productCategories.map((c) => `${company.siteUrl}${c.image}`);
  }
  const cat = productCategories.find((c) => `/products/${c.slug}` === path);
  if (!cat) return [];
  return [...new Set([cat.image, ...(cat.gallery ?? [])])].map(
    (img) => `${company.siteUrl}${img}`,
  );
};

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...productCategories.map((c) => `/products/${c.slug}`),
  ];

  return paths.map((path) => ({
    url: `${company.siteUrl}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
    images: imagesFor(path),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${company.siteUrl}/${l}${path}`]),
      ),
    },
  }));
}
