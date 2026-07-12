# เว็บไซต์ หจก. วีรพงษ์ แพคเกจจิ้ง (Veerapong Packaging)

เว็บไซต์บริษัทขายส่งบรรจุภัณฑ์อุตสาหกรรม — Next.js 16 (App Router) + Tailwind CSS v4 + next-intl

## ฟีเจอร์

- **4 ภาษา**: ไทย (default) / English / 日本語 / 中文 — สลับได้ทุกหน้าโดยอยู่หน้าเดิม
- **AI Chatbot**: ผู้ช่วยตอบคำถามสินค้า ผ่าน OpenRouter (โมเดลฟรี, มี fallback หลายโมเดล)
- **SEO เต็มรูปแบบ**: SSG ทุกหน้า, hreflang 4 ภาษา, JSON-LD (Organization/LocalBusiness/Product), sitemap.xml, robots.txt
- **หน้า**: หน้าแรก / สินค้า 6 หมวด (+หน้ารายละเอียด) / อุตสาหกรรม / เกี่ยวกับเรา / ติดต่อเรา

## เริ่มใช้งาน

```bash
npm install
cp .env.local.example .env.local   # แล้วใส่ OPENROUTER_API_KEY ของคุณ
npm run dev                         # เปิด http://localhost:3000
```

Build production: `npm run build && npm start`

## จุดที่ต้องแก้ก่อนขึ้นจริง (placeholder)

| ที่ไฟล์ | สิ่งที่ต้องแก้ |
|---|---|
| `src/data/company.ts` | เบอร์โทร, อีเมล, LINE ID, โดเมนจริง (`siteUrl`) |
| `src/data/products.ts` | รายการสินค้า/สเปกจริง (ตอนนี้เป็นร่างจากข้อมูลอุตสาหกรรม) |
| `src/messages/*.json` | ประวัติบริษัทในหน้า "เกี่ยวกับเรา" — ปี milestone เป็นร่าง ควรตรวจกับข้อมูลจริง |
| `public/products/*.svg` | เปลี่ยนเป็นรูปถ่ายสินค้าจริงได้ (แก้ path ใน `products.ts`) |

## โครงสร้างเนื้อหา

- ข้อความ UI + เนื้อหาแต่ละหน้า: `src/messages/{th,en,ja,zh}.json`
- ข้อมูลสินค้า (4 ภาษาในไฟล์เดียว): `src/data/products.ts`
- ข้อมูลบริษัท: `src/data/company.ts`
- ระบบภาษา: `src/i18n/` + `src/proxy.ts` (redirect `/` → `/th`)
- AI chat API: `src/app/api/chat/route.ts` (API key อยู่ฝั่ง server เท่านั้น + rate limit ต่อ IP)

## Deploy

แนะนำ [Vercel](https://vercel.com) (ฟรี): import repo แล้วตั้ง env `OPENROUTER_API_KEY` ใน Project Settings → Environment Variables จากนั้นชี้โดเมนจริงและอัปเดต `siteUrl` ใน `src/data/company.ts`
