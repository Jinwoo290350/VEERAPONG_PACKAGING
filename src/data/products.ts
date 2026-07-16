import type { Localized } from "./company";

export interface ProductItem {
  name: Localized;
  desc: Localized;
}

export interface SpecRow {
  label: Localized;
  value: Localized;
}

export interface ProductCategory {
  slug: string;
  image: string;
  isPhoto?: boolean; // true = real photo (cover crop), false/absent = illustration
  accent: string; // tailwind gradient classes for the card header
  name: Localized;
  tagline: Localized;
  description: Localized;
  items: ProductItem[];
  specs: SpecRow[];
  useCases: Localized<string[]>;
}

// Product line-up. Bubble + PP Board content confirmed by the owners
// (July 2026): the company manufactures PP Board boxes in-house and sells
// EPE foam / EVA / air bubble protective packaging. Other categories are
// still drafts — review before going live.
export const productCategories: ProductCategory[] = [
  {
    slug: "foam",
    image: "/photos/foam.jpg",
    isPhoto: true,
    accent: "from-sky-500 to-blue-700",
    name: {
      th: "โฟมกันกระแทก",
      en: "Protective Foam",
      ja: "緩衝フォーム",
      zh: "缓冲泡沫材料",
    },
    tagline: {
      th: "EPE / PU / EVA ตัดขึ้นรูปตามชิ้นงาน",
      en: "EPE / PU / EVA, die-cut to your part",
      ja: "EPE・PU・EVA、部品形状に合わせた加工",
      zh: "EPE / PU / EVA，按工件裁切成型",
    },
    description: {
      th: "โฟมโพลีเอทิลีน (EPE) โฟมโพลียูรีเทน (PU) และโฟม EVA คุณภาพสูง สำหรับปกป้องชิ้นงานจากแรงกระแทกและรอยขีดข่วนระหว่างการขนส่ง มีทั้งแบบแผ่น แบบม้วน และตัดขึ้นรูปตามแบบชิ้นงานของลูกค้า เหมาะสำหรับชิ้นส่วนยานยนต์ อิเล็กทรอนิกส์ และเครื่องใช้ไฟฟ้า",
      en: "High-grade polyethylene (EPE), polyurethane (PU) and EVA foam that protects parts from impact and abrasion in transit. Available as sheets, rolls, and CNC/die-cut inserts made to your part drawings — ideal for automotive components, electronics, and appliances.",
      ja: "輸送中の衝撃や擦り傷から部品を守る高品質なポリエチレンフォーム（EPE）、ポリウレタンフォーム（PU）、EVAフォーム。シート・ロール・部品図面に合わせた抜き加工インサートをご用意。自動車部品、電子機器、家電に最適です。",
      zh: "高品质聚乙烯泡沫（EPE）、聚氨酯泡沫（PU）和EVA泡沫，在运输过程中保护工件免受冲击和刮伤。提供片材、卷材以及按客户图纸定制的模切内衬，适用于汽车零部件、电子产品和家电。",
    },
    items: [
      {
        name: { th: "แผ่นโฟม EPE", en: "EPE Foam Sheets", ja: "EPEフォームシート", zh: "EPE泡沫板" },
        desc: {
          th: "ความหนา 0.5–100 มม. น้ำหนักเบา ไม่ดูดซับน้ำ นำกลับมาใช้ซ้ำได้",
          en: "0.5–100 mm thick, lightweight, water-resistant and reusable",
          ja: "厚さ0.5〜100mm、軽量・耐水・再利用可能",
          zh: "厚度0.5–100毫米，轻质防水，可重复使用",
        },
      },
      {
        name: { th: "โฟมตัดขึ้นรูป (Die-cut)", en: "Die-cut Foam Inserts", ja: "抜き加工フォームインサート", zh: "模切泡沫内衬" },
        desc: {
          th: "ตัดตามแบบ 2D/3D ของชิ้นงาน ล็อกตำแหน่งชิ้นส่วนแน่นหนา",
          en: "Cut to 2D/3D part profiles for a secure, precise fit",
          ja: "部品の2D/3D形状に合わせてカットし、確実に固定",
          zh: "按工件2D/3D轮廓裁切，精准固定零件",
        },
      },
      {
        name: { th: "โฟม PU / EVA", en: "PU / EVA Foam", ja: "PU・EVAフォーム", zh: "PU / EVA泡沫" },
        desc: {
          th: "รองรับงานที่ต้องการความนุ่มพิเศษหรือความทนทานสูง",
          en: "For jobs needing extra-soft cushioning or high durability",
          ja: "特に柔らかいクッション性や高耐久性が必要な用途に",
          zh: "适用于需要超软缓冲或高耐用性的场合",
        },
      },
      {
        name: { th: "โปรไฟล์โฟมกันขอบ", en: "Foam Edge Profiles", ja: "エッジ保護フォーム", zh: "泡沫护角护边条" },
        desc: {
          th: "ป้องกันขอบและมุมชิ้นงาน ใส่-ถอดง่าย",
          en: "U/L edge protection that slips on and off easily",
          ja: "U字・L字型のエッジ保護材、着脱が簡単",
          zh: "U型/L型护边，安装拆卸方便",
        },
      },
    ],
    specs: [
      {
        label: { th: "วัสดุ", en: "Material", ja: "材質", zh: "材质" },
        value: { th: "EPE, PU, EVA", en: "EPE, PU, EVA", ja: "EPE、PU、EVA", zh: "EPE、PU、EVA" },
      },
      {
        label: { th: "ความหนา", en: "Thickness", ja: "厚さ", zh: "厚度" },
        value: { th: "0.5–100 มม.", en: "0.5–100 mm", ja: "0.5〜100mm", zh: "0.5–100毫米" },
      },
      {
        label: { th: "รูปแบบ", en: "Formats", ja: "形態", zh: "形式" },
        value: {
          th: "แผ่น / ม้วน / ตัดขึ้นรูปตามแบบ",
          en: "Sheet / roll / custom die-cut",
          ja: "シート／ロール／カスタム抜き加工",
          zh: "片材 / 卷材 / 定制模切",
        },
      },
      {
        label: { th: "คุณสมบัติ", en: "Properties", ja: "特性", zh: "特性" },
        value: {
          th: "กันกระแทก กันความชื้น รีไซเคิลได้",
          en: "Shock-absorbing, moisture-resistant, recyclable",
          ja: "衝撃吸収・防湿・リサイクル可能",
          zh: "抗冲击、防潮、可回收",
        },
      },
    ],
    useCases: {
      th: ["บุกันกระแทกชิ้นส่วนยานยนต์", "รองสินค้าอิเล็กทรอนิกส์ก่อนใส่กล่อง", "คั่นระหว่างชั้นสินค้าบนพาเลท"],
      en: ["Cushioning automotive parts", "Lining electronics before boxing", "Interleaving palletised goods"],
      ja: ["自動車部品の緩衝材", "電子機器の箱詰め前の保護", "パレット積み製品の間仕切り"],
      zh: ["汽车零部件缓冲保护", "电子产品装箱前的衬垫", "托盘货物层间隔垫"],
    },
  },
  {
    slug: "bubble",
    image: "/photos/bubble.jpg",
    isPhoto: true,
    accent: "from-cyan-500 to-teal-600",
    name: {
      th: "พลาสติกกันกระแทก (บับเบิ้ล)",
      en: "Air Bubble Packaging",
      ja: "エアキャップ（気泡緩衝材）",
      zh: "气泡缓冲包装",
    },
    tagline: {
      th: "สั่งผลิตตามขนาดชิ้นงาน ทั้งงานแผ่นและงานถุง",
      en: "Made to your part size — as sheets or bags",
      ja: "部品サイズに合わせて受注生産 — シートでも袋でも",
      zh: "按工件尺寸定制 — 片材或袋装",
    },
    description: {
      th: "แอร์บับเบิ้ล (พลาสติกกันกระแทก) เม็ดฟองอากาศสีขาวใส มองเห็นสินค้าภายใน น้ำหนักเบา ใช้งานง่าย กันฝุ่น กันน้ำ ทนต่อสารเคมีและเชื้อรา และช่วยยืดอายุการเกิดสนิมของชิ้นงานโลหะ สั่งผลิตตามขนาดชิ้นงานของลูกค้าได้ทั้งงานแผ่นและงานถุง พร้อมชนิดป้องกันไฟฟ้าสถิต (Anti-static) สำหรับชิ้นส่วนอิเล็กทรอนิกส์ที่ไวต่อประจุไฟฟ้า",
      en: "Air bubble cushioning in clear film — you can see the product inside. Lightweight and easy to use, it resists dust, water, chemicals and mould, and helps delay rust on metal parts. Made to order to your part size as sheets or bags, with an anti-static (ESD) grade for static-sensitive electronics.",
      ja: "透明なエアキャップ（気泡緩衝材）。中身が見え、軽量で扱いやすく、防塵・防水・耐薬品・防カビ性に優れ、金属部品のサビ防止にも役立ちます。部品サイズに合わせてシート・袋のどちらでも受注生産可能。静電気に敏感な電子部品向けの帯電防止（ESD）タイプもご用意しています。",
      zh: "透明气泡缓冲膜——可直接看见内部产品。轻便易用，防尘防水，耐化学品与霉菌，并有助于延缓金属件生锈。可按工件尺寸定制片材或袋装，另有防静电（ESD）型号，适用于对静电敏感的电子元件。",
    },
    items: [
      {
        name: { th: "บับเบิ้ลม้วน", en: "Bubble Rolls", ja: "エアキャップロール", zh: "气泡卷材" },
        desc: {
          th: "หน้ากว้าง 65–130 ซม. ยาว 50–100 ม. สีขาวใสมาตรฐาน หรือสีอื่นตามสั่ง",
          en: "65–130 cm wide, 50–100 m rolls — standard clear, colours to order",
          ja: "幅65〜130cm、長さ50〜100m。標準は透明、カラーも対応",
          zh: "宽65–130厘米、长50–100米，标准透明色，可定制颜色",
        },
      },
      {
        name: { th: "งานแผ่นตัดตามขนาด", en: "Cut-to-size Sheets", ja: "サイズカットシート", zh: "按尺寸裁切片材" },
        desc: {
          th: "ตัดตามขนาดชิ้นงานของลูกค้า พร้อมใช้เข้าไลน์แพ็กทันที",
          en: "Sheets cut to your part size, ready for the packing line",
          ja: "部品サイズに合わせてカット、梱包ラインですぐ使えます",
          zh: "按工件尺寸裁切，包装线即取即用",
        },
      },
      {
        name: { th: "ซองบับเบิ้ล (งานถุง)", en: "Bubble Bags", ja: "エアキャップ袋", zh: "气泡袋" },
        desc: {
          th: "สั่งผลิตถุงตามขนาดชิ้นงาน ใส่สินค้าได้รวดเร็ว เหมาะกับงานจำนวนมาก",
          en: "Made-to-size bags for fast insertion — ideal for high volumes",
          ja: "サイズオーダーの袋で素早く梱包、大量向けに最適",
          zh: "按尺寸定制袋装，装件快捷，适合大批量",
        },
      },
      {
        name: { th: "บับเบิ้ลกันไฟฟ้าสถิต (Anti-static)", en: "Anti-static Bubble (ESD)", ja: "帯電防止エアキャップ（ESD）", zh: "防静电气泡膜（ESD）" },
        desc: {
          th: "สำหรับแผงวงจร ฮาร์ดดิสก์ ชิ้นส่วนโทรศัพท์ และอุปกรณ์ที่ไวต่อประจุไฟฟ้า",
          en: "For circuit boards, hard drives, phone parts and static-sensitive devices",
          ja: "基板・HDD・携帯部品など静電気に敏感な機器向け",
          zh: "适用于电路板、硬盘、手机零件等对静电敏感的设备",
        },
      },
    ],
    specs: [
      {
        label: { th: "สี", en: "Colour", ja: "色", zh: "颜色" },
        value: {
          th: "ขาวใส (มาตรฐาน) / สีอื่นตามสั่ง",
          en: "Clear (standard) / colours to order",
          ja: "透明（標準）／カラー対応",
          zh: "透明（标准）/ 可定制颜色",
        },
      },
      {
        label: { th: "ขนาดฟอง", en: "Bubble size", ja: "気泡径", zh: "气泡直径" },
        value: { th: "10 มม. (มาตรฐาน)", en: "10 mm (standard)", ja: "10mm（標準）", zh: "10毫米（标准）" },
      },
      {
        label: { th: "รูปแบบ", en: "Formats", ja: "形態", zh: "形式" },
        value: {
          th: "ม้วน / งานแผ่นตัดตามขนาด / งานถุงสั่งผลิต",
          en: "Rolls / cut-to-size sheets / made-to-order bags",
          ja: "ロール／サイズカットシート／オーダー袋",
          zh: "卷材 / 按尺寸裁切片材 / 定制袋",
        },
      },
      {
        label: { th: "คุณสมบัติ", en: "Properties", ja: "特性", zh: "特性" },
        value: {
          th: "กันกระแทก กันฝุ่น กันน้ำ ทนสารเคมี-เชื้อรา ชะลอสนิม / มีชนิดกัน ESD",
          en: "Shock-, dust- and water-resistant; withstands chemicals & mould; delays rust; ESD grade available",
          ja: "衝撃・防塵・防水、耐薬品・防カビ、防錆補助、ESDタイプあり",
          zh: "抗冲击、防尘防水、耐化学品与霉菌、缓锈，备有防静电型",
        },
      },
    ],
    useCases: {
      th: ["ห่อกรอบรูป เซรามิค เฟอร์นิเจอร์ และสินค้าเปราะบาง", "บรรจุแผงวงจร ฮาร์ดดิสก์ไดรฟ์ และชิ้นส่วนอิเล็กทรอนิกส์ (ชนิดกัน ESD)", "สั่งผลิตถุง/แผ่นตามขนาดชิ้นงานเข้าสายการผลิต"],
      en: ["Wrapping picture frames, ceramics, furniture and fragile goods", "Packing circuit boards, hard drives and electronics (ESD grade)", "Made-to-size bags/sheets feeding production lines"],
      ja: ["額縁・陶磁器・家具など壊れ物の梱包", "基板・HDD・電子部品の梱包（ESDタイプ）", "生産ライン向けサイズオーダーの袋・シート"],
      zh: ["包裹相框、陶瓷、家具等易碎品", "包装电路板、硬盘及电子元件（防静电型）", "按工件尺寸定制袋/片材直供产线"],
    },
  },
  {
    slug: "pp-board",
    image: "/photos/pp-board.jpg",
    isPhoto: true,
    accent: "from-indigo-500 to-violet-700",
    name: {
      th: "แผ่นพลาสติกลูกฟูก (PP Board)",
      en: "Corrugated Plastic (PP Board)",
      ja: "プラダン（PPボード）",
      zh: "中空板（PP瓦楞板）",
    },
    tagline: {
      th: "สินค้าหลักผลิตเอง — กล่องและไส้กั้นหมุนเวียนสำหรับสายการผลิต",
      en: "Manufactured in-house — returnable boxes & dividers",
      ja: "自社製造 — 生産ライン向け通い箱・仕切り",
      zh: "自主生产 — 生产线用周转箱与隔板",
    },
    description: {
      th: "สินค้าหลักที่เราผลิตเอง — แผ่นและกล่องพลาสติกลูกฟูก (PP Board / Future Board) ผลิตจากพลาสติก PP แข็งแรงไม่ฉีกขาดง่าย กันน้ำ 100% เช็ดล้างแล้วนำกลับมาใช้ซ้ำได้หลายรอบ ทนทั้งสารเคมีและน้ำมัน แผ่นมาตรฐาน 1300×2450 มม. ความหนา 2–10 มม. มีให้เลือกถึง 14 สี ตัดตามขนาดที่ต้องการ และขึ้นรูปเป็นกล่องได้หลายแบบตามลักษณะงาน",
      en: "Our flagship in-house product — PP corrugated sheets and boxes (PP Board / Future Board). Tough polypropylene that won't tear like cardboard: 100% waterproof, washable and reusable trip after trip, resistant to chemicals and oils. Standard 1300×2450 mm sheets in 2–10 mm thickness and 14 colours, cut to any size and fabricated into boxes to suit the job.",
      ja: "当社の主力自社製造製品 — プラダン（PPボード／フューチャーボード）のシートと箱。丈夫なPP製で紙のように破れず、100%防水、洗浄して何度でも再利用可能。薬品や油にも強い素材です。標準シート1300×2450mm、厚さ2〜10mm、14色展開。ご希望サイズにカットし、用途に合わせた箱に加工します。",
      zh: "我们的核心自产产品——中空板（PP Board / Future Board）板材与箱子。坚韧的PP塑料不像纸箱易撕裂：100%防水、可清洗反复使用、耐化学品和油污。标准板材1300×2450毫米，厚度2–10毫米，多达14种颜色，可任意裁切并按用途加工成各类箱型。",
    },
    items: [
      {
        name: { th: "แผ่น PP Board ตัดตามขนาด", en: "Cut-to-size PP Board Sheets", ja: "プラダンシート（サイズカット）", zh: "按尺寸裁切中空板" },
        desc: {
          th: "แผ่นมาตรฐาน 1300×2450 มม. หนา 2 / 3 / 4 / 5 / 10 มม. เลือกได้ 14 สี",
          en: "Standard 1300×2450 mm, in 2 / 3 / 4 / 5 / 10 mm and 14 colours",
          ja: "標準1300×2450mm、厚さ2／3／4／5／10mm、14色から選択",
          zh: "标准1300×2450毫米，厚2/3/4/5/10毫米，14色可选",
        },
      },
      {
        name: { th: "กล่องฝาชน / ฝาเกย", en: "Carton-style Boxes", ja: "A式・かぶせ蓋タイプの箱", zh: "对口盖 / 天地盖箱" },
        desc: {
          th: "ทรงเดียวกับกล่องกระดาษที่คุ้นเคย แต่แข็งแรงกว่าและกันน้ำ 100%",
          en: "The familiar carton shape — but far stronger and fully waterproof",
          ja: "見慣れた段ボール形状のまま、より頑丈で100%防水",
          zh: "外形与常见纸箱相同，但更坚固且100%防水",
        },
      },
      {
        name: { th: "กล่องหูหิ้ว / มีช่องมือจับ", en: "Boxes with Hand Holes", ja: "持ち手付きボックス", zh: "带提手孔箱" },
        desc: {
          th: "เหมาะกับกล่องเอกสาร กล่องเครื่องมือ และงานที่ต้องเคลื่อนย้ายบ่อย",
          en: "For document storage, tool boxes and anything moved often",
          ja: "書類箱・工具箱など、頻繁に持ち運ぶ用途に",
          zh: "适合文件箱、工具箱及需要经常搬运的场合",
        },
      },
      {
        name: { th: "กล่องพับได้ (Collapsible)", en: "Collapsible Boxes", ja: "折りたたみボックス", zh: "可折叠箱" },
        desc: {
          th: "พับแบนเมื่อไม่ใช้งาน ประหยัดพื้นที่ขนส่งขากลับ เหมาะกับงานหมุนเวียน",
          en: "Folds flat when empty — saves return-trip space in closed-loop logistics",
          ja: "空の時は折りたたんで返送スペースを節約、循環利用に最適",
          zh: "空箱折叠压平，节省回程运输空间，适合循环使用",
        },
      },
      {
        name: { th: "กล่องพร้อมไส้กั้น (Partition)", en: "Boxes with Partitions", ja: "仕切り付きボックス", zh: "带隔板箱" },
        desc: {
          th: "กั้นช่องด้านในกันชิ้นส่วนกระแทกกันเอง มาตรฐานโรงงานผลิตชิ้นส่วน",
          en: "Internal dividers stop part-on-part contact — the parts-plant standard",
          ja: "内部仕切りで部品同士の接触を防止、部品工場の定番仕様",
          zh: "内部分格防止零件互相碰撞——零部件工厂的标准配置",
        },
      },
    ],
    specs: [
      {
        label: { th: "ขนาดแผ่นมาตรฐาน", en: "Standard sheet", ja: "標準シートサイズ", zh: "标准板材尺寸" },
        value: {
          th: "1300 × 2450 มม. (ตัดตามขนาดได้)",
          en: "1300 × 2450 mm (cut to size)",
          ja: "1300×2450mm（サイズカット可）",
          zh: "1300×2450毫米（可裁切）",
        },
      },
      {
        label: { th: "ความหนา", en: "Thickness", ja: "厚さ", zh: "厚度" },
        value: { th: "2 / 3 / 4 / 5 / 10 มม.", en: "2 / 3 / 4 / 5 / 10 mm", ja: "2／3／4／5／10mm", zh: "2/3/4/5/10毫米" },
      },
      {
        label: { th: "สี", en: "Colours", ja: "色", zh: "颜色" },
        value: {
          th: "14 สี รวมแบบโปร่งแสง",
          en: "14 colours, incl. translucent",
          ja: "全14色（半透明を含む）",
          zh: "14种颜色（含半透明）",
        },
      },
      {
        label: { th: "คุณสมบัติ", en: "Properties", ja: "特性", zh: "特性" },
        value: {
          th: "แข็งแรงไม่ฉีกขาด กันน้ำ 100% ล้างแล้วใช้ซ้ำได้ ทนสารเคมี-น้ำมัน",
          en: "Tear-resistant, 100% waterproof, washable & reusable, chemical/oil-resistant",
          ja: "破れにくい・100%防水・洗って再利用可・耐薬品／耐油",
          zh: "抗撕裂、100%防水、可洗可重复使用、耐化学品与油污",
        },
      },
      {
        label: { th: "ตัวเลือกเสริม", en: "Options", ja: "オプション", zh: "可选项" },
        value: {
          th: "กันไฟฟ้าสถิต (ESD) / กัน UV / พิมพ์โลโก้",
          en: "ESD-safe / UV-resistant / logo printing",
          ja: "帯電防止（ESD）／耐UV／ロゴ印刷",
          zh: "防静电（ESD）/ 抗UV / 印刷标志",
        },
      },
    ],
    useCases: {
      th: ["กล่องหมุนเวียนชิ้นส่วนยานยนต์เข้าไลน์ประกอบ", "ไส้กั้นชิ้นส่วนกันรอยขีดข่วน", "ถาดขนย้ายชิ้นงานในโรงงาน"],
      en: ["Returnable containers feeding assembly lines", "Scratch-preventing part dividers", "In-plant part transfer trays"],
      ja: ["組立ラインへの部品供給用通い箱", "傷防止の部品仕切り", "工場内の部品搬送トレイ"],
      zh: ["供应装配线的零件周转箱", "防刮伤零件隔板", "厂内零件转运托盘"],
    },
  },
  {
    slug: "boxes",
    image: "/photos/boxes.jpg",
    isPhoto: true,
    accent: "from-amber-500 to-orange-600",
    name: {
      th: "กล่องและลังอุตสาหกรรม",
      en: "Industrial Boxes & Crates",
      ja: "産業用ボックス・クレート",
      zh: "工业纸箱与周转筐",
    },
    tagline: {
      th: "กล่องลูกฟูก ลังพลาสติก พาเลท ครบจบที่เดียว",
      en: "Corrugated cartons, plastic crates and pallets in one stop",
      ja: "段ボール・プラコン・パレットをワンストップで",
      zh: "瓦楞纸箱、塑料筐、托盘一站式供应",
    },
    description: {
      th: "กล่องกระดาษลูกฟูก 3 และ 5 ชั้นตามขนาดสั่งผลิต ลังพลาสติกทึบ/โปร่งสำหรับงานหมุนเวียน และพาเลทพลาสติกรองรับงานคลังสินค้าและส่งออก พร้อมให้คำปรึกษาเลือกสเปกที่คุ้มต้นทุนที่สุดต่อการใช้งานจริง",
      en: "Made-to-size 3-ply and 5-ply corrugated cartons, solid and vented plastic crates for closed-loop logistics, and plastic pallets for warehousing and export — with honest advice on the most cost-effective spec for the job.",
      ja: "オーダーサイズの3層・5層段ボール箱、循環物流向けのソリッド／メッシュプラスチックコンテナ、倉庫・輸出向けプラスチックパレットを供給。用途に最適でコスト効率の高い仕様をご提案します。",
      zh: "按尺寸定制的三层/五层瓦楞纸箱、用于循环物流的密封式/网眼式塑料筐，以及仓储和出口用塑料托盘，并为您推荐最具成本效益的规格方案。",
    },
    items: [
      {
        name: { th: "กล่องกระดาษลูกฟูก", en: "Corrugated Cartons", ja: "段ボール箱", zh: "瓦楞纸箱" },
        desc: {
          th: "3 / 5 ชั้น สั่งผลิตตามขนาด พิมพ์แบรนด์ได้",
          en: "3/5-ply, made to size, brand printing available",
          ja: "3層・5層、オーダーサイズ、ブランド印刷可",
          zh: "三层/五层，按尺寸定制，可印刷品牌",
        },
      },
      {
        name: { th: "ลังพลาสติก", en: "Plastic Crates", ja: "プラスチックコンテナ", zh: "塑料周转筐" },
        desc: {
          th: "แบบทึบและโปร่ง วางซ้อนได้ ทนสารเคมี",
          en: "Solid or vented, stackable, chemical-resistant",
          ja: "ソリッド・メッシュ両タイプ、段積み可能、耐薬品性",
          zh: "密封式或网眼式，可堆叠，耐化学品",
        },
      },
      {
        name: { th: "พาเลทพลาสติก", en: "Plastic Pallets", ja: "プラスチックパレット", zh: "塑料托盘" },
        desc: {
          th: "รับน้ำหนัก 1–4 ตัน ผ่านมาตรฐานส่งออก (ไม่ต้องรมยา)",
          en: "1–4 t load, export-compliant (no fumigation needed)",
          ja: "耐荷重1〜4トン、輸出対応（燻蒸不要）",
          zh: "承重1–4吨，符合出口标准（无需熏蒸）",
        },
      },
    ],
    specs: [
      {
        label: { th: "กล่องลูกฟูก", en: "Cartons", ja: "段ボール", zh: "纸箱" },
        value: { th: "ลอน B/C/BC, KS/KA125–KA230", en: "B/C/BC flute, KS/KA125–KA230", ja: "B／C／BCフルート、KS／KA125〜KA230", zh: "B/C/BC瓦楞，KS/KA125–KA230" },
      },
      {
        label: { th: "ลังพลาสติก", en: "Crates", ja: "コンテナ", zh: "周转筐" },
        value: { th: "รับน้ำหนัก 15–50 กก./ใบ", en: "15–50 kg capacity each", ja: "1個あたり15〜50kg", zh: "单筐承重15–50公斤" },
      },
      {
        label: { th: "พาเลท", en: "Pallets", ja: "パレット", zh: "托盘" },
        value: { th: "100×120 / 110×110 ซม. และขนาดพิเศษ", en: "100×120 / 110×110 cm and custom sizes", ja: "100×120／110×110cm、特注サイズ可", zh: "100×120 / 110×110厘米及定制尺寸" },
      },
    ],
    useCases: {
      th: ["ส่งออกสินค้าไปต่างประเทศ", "จัดเก็บในคลังสินค้า", "ขนส่งชิ้นส่วนระหว่างโรงงาน"],
      en: ["Export shipments", "Warehouse storage", "Inter-plant parts transport"],
      ja: ["輸出貨物の梱包", "倉庫保管", "工場間の部品輸送"],
      zh: ["出口货物包装", "仓库存储", "工厂间零件运输"],
    },
  },
  {
    slug: "film-tape",
    image: "/photos/film-tape.jpg",
    isPhoto: true,
    accent: "from-emerald-500 to-green-700",
    name: {
      th: "ฟิล์ม เทป และสายรัด",
      en: "Films, Tapes & Strapping",
      ja: "フィルム・テープ・結束バンド",
      zh: "薄膜、胶带与打包带",
    },
    tagline: {
      th: "วัสดุสิ้นเปลืองงานแพ็กครบทุกไลน์",
      en: "Every packing consumable your line needs",
      ja: "梱包ラインに必要な消耗資材をすべて",
      zh: "包装线所需的全部耗材",
    },
    description: {
      th: "สเตรทช์ฟิล์มพันพาเลทเกรดเหนียวพิเศษ เทป OPP ปิดกล่อง สายรัดพลาสติก PP/PET และอุปกรณ์รัด จัดส่งสม่ำเสมอเป็นรอบตามแผนการผลิตของโรงงาน ไม่ให้ไลน์ผลิตสะดุดเพราะของหมดสต๊อก",
      en: "High-tack pallet stretch film, OPP carton sealing tape, PP/PET strapping and tensioning tools — delivered on a steady schedule matched to your production plan so the line never stops for missing consumables.",
      ja: "高粘着パレットストレッチフィルム、OPP梱包テープ、PP／PET結束バンドと締め具を、生産計画に合わせて定期納入。資材切れでラインを止めません。",
      zh: "高粘度托盘缠绕膜、OPP封箱胶带、PP/PET打包带及打包工具，按工厂生产计划定期配送，确保产线不因缺料停工。",
    },
    items: [
      {
        name: { th: "สเตรทช์ฟิล์ม", en: "Stretch Film", ja: "ストレッチフィルム", zh: "缠绕膜" },
        desc: {
          th: "หนา 15–25 ไมครอน ยืดได้ 200–300%",
          en: "15–25 micron, 200–300% stretch",
          ja: "厚さ15〜25ミクロン、伸長率200〜300%",
          zh: "厚度15–25微米，拉伸率200–300%",
        },
      },
      {
        name: { th: "เทป OPP", en: "OPP Tape", ja: "OPPテープ", zh: "OPP胶带" },
        desc: {
          th: "ใส/น้ำตาล/พิมพ์โลโก้ กาวเหนียวติดแน่น",
          en: "Clear/brown/logo-printed with aggressive adhesive",
          ja: "透明・茶・ロゴ印刷対応、高粘着",
          zh: "透明/棕色/可印logo，粘性强",
        },
      },
      {
        name: { th: "สายรัด PP / PET", en: "PP / PET Strapping", ja: "PP／PETバンド", zh: "PP / PET打包带" },
        desc: {
          th: "ทดแทนสายรัดเหล็ก ปลอดภัยกว่า ไม่เป็นสนิม",
          en: "A safer, rust-free replacement for steel strapping",
          ja: "スチールバンドの代替として安全・防錆",
          zh: "替代钢带，更安全且不生锈",
        },
      },
    ],
    specs: [
      {
        label: { th: "สเตรทช์ฟิล์ม", en: "Stretch film", ja: "ストレッチフィルム", zh: "缠绕膜" },
        value: { th: "หน้ากว้าง 50 ซม. / มือ-เครื่อง", en: "50 cm width, hand & machine grade", ja: "幅50cm、手巻き・機械巻き両対応", zh: "宽50厘米，手用/机用" },
      },
      {
        label: { th: "เทป", en: "Tape", ja: "テープ", zh: "胶带" },
        value: { th: "48–72 มม. × 45–1,000 ม.", en: "48–72 mm × 45–1,000 m", ja: "48〜72mm × 45〜1,000m", zh: "48–72毫米 × 45–1,000米" },
      },
      {
        label: { th: "สายรัด", en: "Strapping", ja: "バンド", zh: "打包带" },
        value: { th: "แรงดึง 100–600 กก.", en: "100–600 kg break strength", ja: "破断強度100〜600kg", zh: "断裂强度100–600公斤" },
      },
    ],
    useCases: {
      th: ["พันพาเลทก่อนขึ้นตู้คอนเทนเนอร์", "ปิดกล่องสายการแพ็ก", "รัดสินค้าหนักและวัสดุก่อสร้าง"],
      en: ["Pallet wrapping before container loading", "Carton sealing on pack lines", "Strapping heavy goods and building materials"],
      ja: ["コンテナ積み前のパレット梱包", "梱包ラインでの封函", "重量物・建材の結束"],
      zh: ["装柜前托盘缠绕", "包装线封箱", "重货及建材打包"],
    },
  },
  {
    slug: "custom",
    image: "/products/custom.svg",
    accent: "from-rose-500 to-red-700",
    name: {
      th: "งานออกแบบตามชิ้นงาน",
      en: "Custom Packaging Design",
      ja: "カスタム包装設計",
      zh: "定制包装设计",
    },
    tagline: {
      th: "ส่งชิ้นงานมา เราออกแบบบรรจุภัณฑ์ให้",
      en: "Send us your part — we engineer the packaging",
      ja: "部品をお送りください。最適な包装を設計します",
      zh: "寄来工件，我们为您设计包装方案",
    },
    description: {
      th: "บริการออกแบบบรรจุภัณฑ์เฉพาะชิ้นงาน เริ่มจากวิเคราะห์ชิ้นงานจริงหรือแบบ CAD ทดลองผลิตตัวอย่าง (Prototype) ทดสอบการป้องกัน แล้วจึงผลิตจริง ประสบการณ์เกือบ 20 ปีกับชิ้นส่วนยานยนต์ในซัพพลายเชนโตโยต้าและฮิตาชิ ทำให้เรารู้ว่าบรรจุภัณฑ์ที่ดีต้องปกป้องได้จริงและคุมต้นทุนได้ด้วย",
      en: "Part-specific packaging engineering: we analyse your physical part or CAD data, prototype, drop-test, then move to production. Nearly two decades supplying automotive parts packaging in Toyota and Hitachi supply chains taught us that good packaging must both protect the part and control cost.",
      ja: "部品専用の包装設計サービス。実物またはCADデータを分析し、試作・落下試験を経て量産へ。トヨタ・日立のサプライチェーンで約20年、自動車部品包装を手がけてきた経験から、確実な保護とコスト管理を両立する包装をご提案します。",
      zh: "针对具体工件的包装工程服务：分析实物或CAD数据，打样、跌落测试后再量产。近二十年为丰田、日立供应链提供汽车零部件包装的经验，让我们深知好的包装既要保护到位，也要控制成本。",
    },
    items: [
      {
        name: { th: "วิเคราะห์และออกแบบ", en: "Analysis & Design", ja: "分析・設計", zh: "分析与设计" },
        desc: {
          th: "ประเมินจุดเสี่ยงชิ้นงาน เลือกวัสดุและโครงสร้างที่เหมาะสม",
          en: "Assess part risk points, pick the right material and structure",
          ja: "部品のリスク箇所を評価し、最適な材料と構造を選定",
          zh: "评估工件风险点，选择合适的材料与结构",
        },
      },
      {
        name: { th: "ตัวอย่างทดสอบ", en: "Prototype & Test", ja: "試作・試験", zh: "打样与测试" },
        desc: {
          th: "ผลิตตัวอย่างให้ทดลองใช้จริงก่อนสั่งผลิตจำนวนมาก",
          en: "Working samples for real-world trials before volume orders",
          ja: "量産前に実環境で試せるサンプルを製作",
          zh: "量产前提供样品供实际试用",
        },
      },
      {
        name: { th: "ผลิตและส่งมอบตามรอบ", en: "Production & Scheduled Delivery", ja: "量産・定期納入", zh: "量产与定期交付" },
        desc: {
          th: "ผลิตตามยอดใช้จริง ส่งตรงเข้าโรงงานตามแผนการผลิต",
          en: "Volume production with deliveries synced to your build schedule",
          ja: "使用量に合わせて生産し、生産計画に同期して工場へ直納",
          zh: "按实际用量生产，按生产计划直送工厂",
        },
      },
    ],
    specs: [
      {
        label: { th: "ข้อมูลตั้งต้น", en: "Input", ja: "必要データ", zh: "所需资料" },
        value: { th: "ชิ้นงานจริง หรือแบบ 2D/3D CAD", en: "Physical part or 2D/3D CAD", ja: "実物部品または2D／3D CAD", zh: "实物工件或2D/3D CAD图纸" },
      },
      {
        label: { th: "ระยะเวลาตัวอย่าง", en: "Sample lead time", ja: "サンプル納期", zh: "打样周期" },
        value: { th: "5–10 วันทำการ", en: "5–10 working days", ja: "5〜10営業日", zh: "5–10个工作日" },
      },
      {
        label: { th: "ขั้นต่ำ", en: "MOQ", ja: "最小ロット", zh: "起订量" },
        value: { th: "ยืดหยุ่นตามประเภทงาน", en: "Flexible by job type", ja: "案件に応じて柔軟に対応", zh: "视项目类型灵活确定" },
      },
    ],
    useCases: {
      th: ["บรรจุภัณฑ์ชิ้นส่วนยานยนต์ส่งเข้าไลน์ OEM", "กันกระแทกชิ้นงานมูลค่าสูง", "ลดต้นทุนบรรจุภัณฑ์ต่อหน่วยด้วยงานหมุนเวียน"],
      en: ["OEM-bound automotive part packaging", "Protecting high-value parts", "Cutting per-unit cost with returnable systems"],
      ja: ["OEMライン向け自動車部品包装", "高価値部品の保護", "通い箱化による単価コスト削減"],
      zh: ["OEM产线汽车零部件包装", "高价值工件防护", "通过循环包装降低单件成本"],
    },
  },
];

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}
