// Builds the company poster: clean white sheet, logo + company name top-left,
// product cut-outs in circular frames, contact block at the foot.
// Run: NODE_PATH=./node_modules node scripts/build-poster.js
const sharp = require("sharp");

const W = 2000;
const H = 2828; // A-series ratio (√2) — prints cleanly at A2/A3

const GREEN_900 = "#14472c";
const GREEN_700 = "#1c6a3e";
const GREEN_500 = "#2f9e5e";
const GREEN_100 = "#dcefe2";
const AMBER = "#f4701a";
const INK = "#0f2a1b";
const MUTED = "#6b8577";
const THAI = "'Noto Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";
const SANS = "'Helvetica Neue',Arial,sans-serif";

// The same nine photos that slide in the website marquee
const products = [
  { file: "public/photos/pp-board/pp-box-partition-set.png", th: "กล่อง PP Board + ไส้กั้น" },
  { file: "public/photos/pp-board/pp-board-sheets.png", th: "แผ่น PP Board 14 สี" },
  { file: "public/photos/foam/epe-foam-roll.png", th: "ม้วนโฟม EPE" },
  { file: "public/photos/bubble/air-bubble-rolls.jpg", th: "ม้วนแอร์บับเบิ้ล" },
  { file: "public/photos/bubble/bubble-bags-antistatic.png", th: "ถุงบับเบิ้ล / กัน ESD" },
  { file: "public/photos/pp-board/pp-box-with-partition.png", th: "กล่องไส้กั้นแบ่งช่อง" },
  { file: "public/photos/boxes/pp-box-handles.png", th: "ลัง PP Board หูหิ้ว" },
  { file: "public/photos/foam/partition-pp-pe-foam.png", th: "ไส้กั้น PP หุ้มโฟม PE" },
  { file: "public/photos/foam/partition-pp-eva-foam.png", th: "ไส้กั้น PP หุ้มโฟม EVA" },
];

// Circle grid: 3 × 3
const D = 380; // circle diameter
const GAP_X = 110;
const CAPTION_H = 96;
const GAP_Y = 40;
const GRID_TOP = 700;
const GRID_LEFT = (W - (D * 3 + GAP_X * 2)) / 2;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function circleTile(p) {
  // White disc with a soft green ring
  const disc = Buffer.from(
    `<svg width="${D}" height="${D}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${D / 2}" cy="${D / 2}" r="${D / 2 - 3}" fill="#ffffff" stroke="${GREEN_100}" stroke-width="6"/>
    </svg>`,
  );

  const photo = await sharp(p.file)
    .resize(Math.round(D * 0.72), Math.round(D * 0.72), {
      fit: "inside",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();
  const pm = await sharp(photo).metadata();

  const withPhoto = await sharp(disc)
    .composite([
      {
        input: photo,
        top: Math.round((D - (pm.height || 0)) / 2),
        left: Math.round((D - (pm.width || 0)) / 2),
      },
    ])
    .png()
    .toBuffer();

  // Clip anything that spills past the disc edge
  const clipped = await sharp(withPhoto)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#fff"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const caption = Buffer.from(
    `<svg width="${D}" height="${CAPTION_H}" xmlns="http://www.w3.org/2000/svg">
      <style>.c{font-family:${THAI};font-size:34px;font-weight:700;fill:${INK};}</style>
      <text class="c" x="${D / 2}" y="52" text-anchor="middle">${esc(p.th)}</text>
    </svg>`,
  );

  return sharp({
    create: { width: D, height: D + CAPTION_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } },
  })
    .composite([
      { input: clipped, top: 0, left: 0 },
      { input: caption, top: D + 6, left: 0 },
    ])
    .png()
    .toBuffer();
}

async function build() {
  const layers = [];

  // ── white sheet with a whisper of brand colour at the edges ──
  const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tl" cx="0.08" cy="0.05" r="0.5">
        <stop offset="0" stop-color="${GREEN_500}" stop-opacity="0.10"/>
        <stop offset="1" stop-color="${GREEN_500}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="br" cx="0.95" cy="0.97" r="0.5">
        <stop offset="0" stop-color="${GREEN_500}" stop-opacity="0.08"/>
        <stop offset="1" stop-color="${GREEN_500}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#ffffff"/>
    <rect width="${W}" height="${H}" fill="url(#tl)"/>
    <rect width="${W}" height="${H}" fill="url(#br)"/>
    <rect x="0" y="0" width="${W}" height="14" fill="${GREEN_700}"/>
  </svg>`;
  const base = sharp(Buffer.from(bg)).png();

  // ── logo, top-left ───────────────────────────────────────
  const logo = await sharp("public/logo-mark.png")
    .resize(190, 190, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  layers.push({ input: logo, top: 150, left: 140 });

  // ── company name beside the logo + intro block ───────────
  const header = `<svg width="${W}" height="620" xmlns="http://www.w3.org/2000/svg">
    <style>
      .name  { font-family:${THAI}; font-size:74px; font-weight:800; fill:${INK}; }
      .en    { font-family:${SANS}; font-size:28px; font-weight:700; fill:${GREEN_500}; letter-spacing:7px; }
      .role  { font-family:${THAI}; font-size:52px; font-weight:700; fill:${GREEN_900}; }
      .line  { font-family:${THAI}; font-size:38px; fill:${MUTED}; }
      .chip  { font-family:${SANS}; font-size:26px; font-weight:700; fill:${GREEN_700}; letter-spacing:3px; }
    </style>
    <text class="name" x="370" y="88" >หจก. วีรพงษ์ แพคเกจจิ้ง</text>
    <text class="en"   x="374" y="140">VEERAPONG PACKAGING</text>
    <rect x="140" y="252" width="${W - 280}" height="2" fill="#e6ece8"/>

    <text class="role" x="${W / 2}" y="356" text-anchor="middle">ผู้ผลิตและจำหน่ายบรรจุภัณฑ์อุตสาหกรรม</text>
    <text class="line" x="${W / 2}" y="424" text-anchor="middle">ปกป้องทุกชิ้นงานของคุณถึงปลายทาง · ผลิตตามขนาดที่ต้องการ · ส่งตรงถึงโรงงาน</text>

    <g transform="translate(${W / 2 - 700}, 470)">
      <rect x="0"    y="0" width="330" height="66" rx="33" fill="${GREEN_100}"/>
      <rect x="356"  y="0" width="290" height="66" rx="33" fill="${GREEN_100}"/>
      <rect x="672"  y="0" width="290" height="66" rx="33" fill="${GREEN_100}"/>
      <rect x="988"  y="0" width="412" height="66" rx="33" fill="${GREEN_100}"/>
      <text class="chip" x="165"  y="43" text-anchor="middle">PP BOARD</text>
      <text class="chip" x="501"  y="43" text-anchor="middle">EPE FOAM</text>
      <text class="chip" x="817"  y="43" text-anchor="middle">EVA FOAM</text>
      <text class="chip" x="1194" y="43" text-anchor="middle">AIR BUBBLE</text>
    </g>
  </svg>`;
  layers.push({ input: Buffer.from(header), top: 160, left: 0 });

  // ── product circles ──────────────────────────────────────
  for (let i = 0; i < products.length; i++) {
    const tile = await circleTile(products[i]);
    const col = i % 3;
    const row = Math.floor(i / 3);
    layers.push({
      input: tile,
      left: Math.round(GRID_LEFT + col * (D + GAP_X)),
      top: Math.round(GRID_TOP + row * (D + CAPTION_H + GAP_Y)),
    });
  }

  // ── printing service strip ───────────────────────────────
  const stripTop = GRID_TOP + 3 * (D + CAPTION_H + GAP_Y) + 10;
  const strip = `<svg width="${W}" height="120" xmlns="http://www.w3.org/2000/svg">
    <style>
      .p { font-family:${THAI}; font-size:40px; font-weight:700; fill:${GREEN_900}; }
    </style>
    <rect x="140" y="0" width="${W - 280}" height="96" rx="48" fill="#f4f9f6"/>
    <circle cx="230" cy="48" r="12" fill="${AMBER}"/>
    <text class="p" x="${W / 2 + 20}" y="62" text-anchor="middle">พร้อมบริการรับพิมพ์สื่อสิ่งพิมพ์ทุกชนิด</text>
  </svg>`;
  layers.push({ input: Buffer.from(strip), top: stripTop, left: 0 });

  // ── contact footer ───────────────────────────────────────
  const footTop = stripTop + 170;
  const footer = `<svg width="${W}" height="${H - footTop}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .h { font-family:${THAI}; font-size:40px; font-weight:800; fill:${AMBER}; letter-spacing:3px; }
      .b { font-family:${THAI}; font-size:42px; font-weight:700; fill:${INK}; }
      .s { font-family:${THAI}; font-size:32px; fill:${MUTED}; }
    </style>
    <rect x="140" y="0" width="${W - 280}" height="2" fill="#e6ece8"/>
    <text class="h" x="${W / 2}" y="82"  text-anchor="middle">ติดต่อสั่งซื้อ / ขอใบเสนอราคา</text>
    <text class="b" x="${W / 2}" y="158" text-anchor="middle">โทร. 081-686-1818 (คุณภูษิต) · 061-780-1818 (คุณศิริขวัญ)</text>
    <text class="b" x="${W / 2}" y="222" text-anchor="middle">LINE : nu0816861818</text>
    <text class="s" x="${W / 2}" y="284" text-anchor="middle">Vrp.nu4289@gmail.com · www.veerapongpackaging.com</text>
    <text class="s" x="${W / 2}" y="340" text-anchor="middle">12/34 ถนนมาเจริญ แขวงหนองแขม เขตหนองแขม กรุงเทพฯ 10160</text>
  </svg>`;
  layers.push({ input: Buffer.from(footer), top: footTop, left: 0 });

  await base.composite(layers).png().toFile("public/poster.png");
  await sharp("public/poster.png").resize(1000).jpeg({ quality: 92 }).toFile("public/poster-preview.jpg");
  console.log("poster written", W + "x" + H, "| grid ends", GRID_TOP + 3 * (D + CAPTION_H + GAP_Y), "| footer", footTop);
}

build().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
