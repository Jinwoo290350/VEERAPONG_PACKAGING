import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

// NOTE: phone / email / LINE are placeholders — replace with real contact
// details before going live.
export const company = {
  founded: 2007,
  regNo: "0103550035631",
  phone: "02-000-0000",
  mobile: "080-000-0000",
  email: "sales@veerapongpackaging.com",
  lineId: "@vrppackaging",
  siteUrl: "https://www.veerapongpackaging.com",
  name: {
    th: "ห้างหุ้นส่วนจำกัด วีรพงษ์ แพคเกจจิ้ง",
    en: "Veerapong Packaging Ltd., Part.",
    ja: "ウィーラポン・パッケージング社",
    zh: "威拉蓬包装有限合伙公司",
  } satisfies Localized,
  shortName: {
    th: "วีรพงษ์ แพคเกจจิ้ง",
    en: "Veerapong Packaging",
    ja: "Veerapong Packaging",
    zh: "Veerapong Packaging",
  } satisfies Localized,
  address: {
    th: "12/34 ถนนมหาเจริญ แขวงหนองแขม เขตหนองแขม กรุงเทพมหานคร 10160",
    en: "12/34 Mahacharoen Rd., Nong Khaem, Bangkok 10160, Thailand",
    ja: "12/34 Mahacharoen Rd., Nong Khaem, バンコク 10160, タイ",
    zh: "泰国曼谷市农凯区马哈乍伦路12/34号 邮编10160",
  } satisfies Localized,
} as const;

export const yearsInBusiness = new Date().getFullYear() - company.founded;
