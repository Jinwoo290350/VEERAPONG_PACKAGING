import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

// Real contact details confirmed by the owners (July 2026).
// LINE ID is still a placeholder — confirm before going live.
export const company = {
  founded: 2007,
  regNo: "0103550035631",
  phone: "081-686-1818",
  mobile: "061-780-1818",
  email: "Vrp.nu4289@gmail.com",
  emails: ["Vrp.nu4289@gmail.com", "Vrp_nu@hotmail.com", "Sirikwan.ruangsri@gmail.com"],
  lineId: "nu0816861818",
  lineUrl: "https://line.me/ti/p/~nu0816861818",
  siteUrl: "https://www.veerapongpackaging.com",
  contacts: [
    {
      phone: "081-686-1818",
      name: {
        th: "คุณภูษิต ฮะภูริวัฒน์",
        en: "Phusit Haphuriwat",
        ja: "プシット・ハプリワット",
        zh: "普西·哈普里瓦",
      } satisfies Localized,
    },
    {
      phone: "061-780-1818",
      name: {
        th: "คุณศิริขวัญ ฮะภูริวัฒน์",
        en: "Sirikwan Haphuriwat",
        ja: "シリクワン・ハプリワット",
        zh: "西丽宽·哈普里瓦",
      } satisfies Localized,
    },
  ],
  name: {
    th: "ห้างหุ้นส่วนจำกัด วีรพงษ์ แพคเกจจิ้ง",
    en: "Veerapong Packaging Limited Partnership",
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
    th: "12/34 ถนนมาเจริญ แขวงหนองแขม เขตหนองแขม กรุงเทพมหานคร 10160 (สำนักงานใหญ่)",
    en: "12/34 Macharoen Road, Nong Khaem, Bangkok 10160, Thailand (Head Office)",
    ja: "12/34 Macharoen Road, Nong Khaem, バンコク 10160, タイ（本社）",
    zh: "泰国曼谷市农凯区玛乍伦路12/34号 邮编10160（总部）",
  } satisfies Localized,
} as const;

export const yearsInBusiness = new Date().getFullYear() - company.founded;
