import { company, yearsInBusiness } from "@/data/company";
import { productCategories } from "@/data/products";
import type { Locale } from "@/i18n/routing";

export default function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${company.siteUrl}/#organization`,
        name: company.name[locale],
        alternateName: [company.name.th, company.name.en],
        url: company.siteUrl,
        foundingDate: "2007-11-06",
        email: company.email,
        telephone: company.phone,
        taxID: company.regNo,
        description: `Industrial packaging wholesaler with ${yearsInBusiness}+ years of experience serving automotive supply chains.`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "12/34 Mahacharoen Rd.",
          addressLocality: "Nong Khaem",
          addressRegion: "Bangkok",
          postalCode: "10160",
          addressCountry: "TH",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${company.siteUrl}/#localbusiness`,
        name: company.name[locale],
        image: `${company.siteUrl}/og.png`,
        url: `${company.siteUrl}/${locale}`,
        telephone: company.phone,
        email: company.email,
        priceRange: "฿฿",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12/34 Mahacharoen Rd.",
          addressLocality: "Nong Khaem",
          addressRegion: "Bangkok",
          postalCode: "10160",
          addressCountry: "TH",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "17:30",
        },
        parentOrganization: { "@id": `${company.siteUrl}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${company.siteUrl}/${locale}/products#itemlist`,
        name: "Industrial Packaging Products",
        itemListElement: productCategories.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: c.name[locale],
            description: c.tagline[locale],
            url: `${company.siteUrl}/${locale}/products/${c.slug}`,
            image: `${company.siteUrl}${c.image}`,
            brand: { "@id": `${company.siteUrl}/#organization` },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
