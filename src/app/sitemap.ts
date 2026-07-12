import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";

const staticPaths = ["", "/products", "/industries", "/about", "/contact"];

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
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${company.siteUrl}/${l}${path}`]),
      ),
    },
  }));
}
