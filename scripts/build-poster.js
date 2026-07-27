// Builds the company poster: brand-green backdrop, VP logo, product cut-outs
// and contact details. Text is drawn as SVG (system Thai font) then composited
// with the real product photos via sharp.
const sharp = require("sharp");

const W = 2000;
const H = 2828; // A-series ratio (√2), prints cleanly at A2/A3

const GREEN_950 = "#0a2a1a";
const GREEN_900 = "#14472c";
const GREEN_500 = "#2f9e5e";
const AMBER = "#f4701a";
const THAI = "'Noto Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";

const products = [
  { file: "public/photos/pp-board/pp-box-partition-set.png", th: "กล่อง PP Board + ไส้กั้น", en: "PP BOARD BOX & PARTITION" },
  { file: "public/photos/pp-board/pp-board-sheets.png", th: "แผ่น PP Board 14 สี", en: "PP BOARD SHEETS" },
  { file: "public/photos/foam/epe-foam-roll.png", th: "ม้วนโฟม EPE", en: "EPE FOAM ROLL" },
  { file: "public/photos/bubble/air-bubble-rolls.jpg", th: "ม้วนแอร์บับเบิ้ล", en: "AIR BUBBLE ROLL" },
  { file: "public/photos/bubble/bubble-bags-antistatic.png", th: "ถุงบับเบิ้ล / กัน ESD", en: "BUBBLE BAGS" },
  { file: "public/photos/foam/partition-pp-eva-foam.png", th: "ไส้กั้น PP หุ้ม EVA", en: "EVA-LINED PARTITION" },
];

// Grid: 2 columns × 3 rows of product tiles
const GRID_TOP = 1020;
const TILE_W = 830;
const TILE_H = 420;
const GAP_X = 80;
const GAP_Y = 50;
const GRID_LEFT = (W - (TILE_W * 2 + GAP_X)) / 2;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function build() {
  const layers = [];

  // ── background ───────────────────────────────────────────
  const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GREEN_900}"/>
        <stop offset="0.55" stop-color="${GREEN_950}"/>
        <stop offset="1" stop-color="#061a10"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.12" r="0.6">
        <stop offset="0" stop-color="${GREEN_500}" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${GREEN_500}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="weave" width="96" height="96" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="4">
          <path d="M0 24h40M56 24h40M24 0v40M24 56v40M0 72h40M56 72h40M72 0v40M72 56v40"/>
        </g>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <rect width="${W}" height="${H}" fill="url(#weave)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`;
  const base = sharp(Buffer.from(bg)).png();

  // ── logo ─────────────────────────────────────────────────
  const logo = await sharp("public/logo-mark.png").resize(300, 300, { fit: "contain" }).png().toBuffer();
  const logoPlate = await sharp({
    create: { width: 340, height: 340, channels: 4, background: "#ffffff" },
  })
    .composite([{ input: logo, top: 20, left: 20 }])
    .png()
    .toBuffer();
  const logoRounded = await sharp(logoPlate)
    .composite([
      {
        input: Buffer.from(`<svg width="340" height="340"><rect width="340" height="340" rx="52" fill="#fff"/></svg>`),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  layers.push({ input: logoRounded, top: 120, left: (W - 340) / 2 });

  // ── header text ──────────────────────────────────────────
  const header = `<svg width="${W}" height="620" xmlns="http://www.w3.org/2000/svg">
    <style>
      .name { font-family:${THAI}; font-size:112px; font-weight:800; fill:#ffffff; letter-spacing:2px; }
      .en   { font-family:'Helvetica Neue',Arial,sans-serif; font-size:40px; font-weight:700; fill:${GREEN_500}; letter-spacing:10px; }
      .role { font-family:${THAI}; font-size:52px; font-weight:700; fill:#ffffff; }
      .line { font-family:${THAI}; font-size:44px; fill:#cfe3d6; }
    </style>
    <text class="name" x="${W / 2}" y="150" text-anchor="middle">หจก. วีรพงษ์ แพคเกจจิ้ง</text>
    <text class="en"   x="${W / 2}" y="215" text-anchor="middle">VEERAPONG PACKAGING</text>
    <rect x="${W / 2 - 90}" y="258" width="180" height="7" rx="4" fill="${AMBER}"/>
    <text class="role" x="${W / 2}" y="356" text-anchor="middle">ผู้ผลิตและจำหน่ายบรรจุภัณฑ์อุตสาหกรรม</text>
    <text class="line" x="${W / 2}" y="424" text-anchor="middle">กล่องพลาสติกลูกฟูก (PP BOARD) · EPE FOAM · EVA FOAM · AIR BUBBLE</text>
    <text class="line" x="${W / 2}" y="484" text-anchor="middle">และรับพิมพ์สื่อสิ่งพิมพ์ทุกชนิด</text>
  </svg>`;
  layers.push({ input: Buffer.from(header), top: 500, left: 0 });

  // ── product tiles ────────────────────────────────────────
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = Math.round(GRID_LEFT + col * (TILE_W + GAP_X));
    const y = Math.round(GRID_TOP + row * (TILE_H + GAP_Y));

    const plate = Buffer.from(
      `<svg width="${TILE_W}" height="${TILE_H}"><rect width="${TILE_W}" height="${TILE_H}" rx="40" fill="#ffffff"/></svg>`,
    );
    const photo = await sharp(p.file)
      .resize(TILE_W - 90, TILE_H - 150, { fit: "inside", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    const pm = await sharp(photo).metadata();

    const caption = Buffer.from(
      `<svg width="${TILE_W}" height="110" xmlns="http://www.w3.org/2000/svg">
        <style>
          .th { font-family:${THAI}; font-size:38px; font-weight:700; fill:${GREEN_900}; }
          .en { font-family:'Helvetica Neue',Arial,sans-serif; font-size:22px; font-weight:600; fill:#6b8577; letter-spacing:3px; }
        </style>
        <text class="th" x="${TILE_W / 2}" y="44" text-anchor="middle">${esc(p.th)}</text>
        <text class="en" x="${TILE_W / 2}" y="84" text-anchor="middle">${esc(p.en)}</text>
      </svg>`,
    );

    const tile = await sharp(plate)
      .composite([
        {
          input: photo,
          top: Math.round((TILE_H - 150 - (pm.height || 0)) / 2) + 24,
          left: Math.round((TILE_W - (pm.width || 0)) / 2),
        },
        { input: caption, top: TILE_H - 118, left: 0 },
      ])
      .png()
      .toBuffer();

    layers.push({ input: tile, top: y, left: x });
  }

  // ── footer: contact ──────────────────────────────────────
  const footY = GRID_TOP + 3 * TILE_H + 2 * GAP_Y + 70;
  const footer = `<svg width="${W}" height="${H - footY}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .h  { font-family:${THAI}; font-size:46px; font-weight:800; fill:${AMBER}; letter-spacing:4px; }
      .b  { font-family:${THAI}; font-size:42px; font-weight:700; fill:#ffffff; }
      .s  { font-family:${THAI}; font-size:34px; fill:#bcd6c6; }
    </style>
    <rect x="${(W - 1720) / 2}" y="0" width="1720" height="4" fill="#ffffff" opacity="0.15"/>
    <text class="h" x="${W / 2}" y="92" text-anchor="middle">ติดต่อสั่งซื้อ / ขอใบเสนอราคา</text>
    <text class="b" x="${W / 2}" y="172" text-anchor="middle">โทร. 081-686-1818 (คุณภูษิต)   ·   061-780-1818 (คุณศิริขวัญ)</text>
    <text class="b" x="${W / 2}" y="238" text-anchor="middle">LINE : nu0816861818</text>
    <text class="s" x="${W / 2}" y="304" text-anchor="middle">Vrp.nu4289@gmail.com   ·   www.veerapongpackaging.com</text>
    <text class="s" x="${W / 2}" y="364" text-anchor="middle">12/34 ถนนมาเจริญ แขวงหนองแขม เขตหนองแขม กรุงเทพฯ 10160</text>
  </svg>`;
  layers.push({ input: Buffer.from(footer), top: footY, left: 0 });

  await base.composite(layers).png().toFile("public/poster.png");
  await sharp("public/poster.png").resize(1000).jpeg({ quality: 92 }).toFile("public/poster-preview.jpg");
  console.log("poster written", W + "x" + H);
}

build().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
