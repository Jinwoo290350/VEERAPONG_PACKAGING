import type { Localized } from "./company";

// Long-tail guides. Buyers search for a thickness or a sheet size long before
// they search for a company, so each guide owns one of those question clusters
// on a page of its own rather than being buried in a category description.
export interface GuideRow {
  spec: Localized;
  use: Localized;
  note: Localized;
}

export interface GuideFaq {
  q: Localized;
  a: Localized;
}

export interface Guide {
  slug: string;
  metaTitle: Localized;
  metaDescription: Localized;
  title: Localized;
  intro: Localized;
  tableTitle: Localized;
  colSpec: Localized;
  colUse: Localized;
  colNote: Localized;
  rows: GuideRow[];
  faqs: GuideFaq[];
}

export const guides: Guide[] = [
  {
    slug: "pp-board-thickness",
    metaTitle: {
      th: "ฟิวเจอร์บอร์ด หนากี่มิลดี? เทียบ 2-10 มม. พร้อมขนาด 130x245 ซม.",
      en: "How Thick Should PP Board Be? A 2–10 mm Guide",
      ja: "PPボードの厚みの選び方（2〜10mm）",
      zh: "PP中空板该选多厚？2-10毫米选型指南",
    },
    metaDescription: {
      th: "เลือกความหนาฟิวเจอร์บอร์ด (PP Board) 2, 3, 4, 5 หรือ 10 มิล ให้ตรงงาน พร้อมขนาดแผ่นมาตรฐาน 130x245 ซม. และการตัดตามขนาด",
      en: "Pick the right PP Board thickness — 2, 3, 4, 5 or 10 mm — with standard 1300x2450 mm sheets and cut-to-size options.",
      ja: "PPボードの厚み（2・3・4・5・10mm）の選び方と、標準サイズ1300×2450mm、カットサイズ対応について。",
      zh: "如何选择PP中空板厚度（2、3、4、5、10毫米），标准板1300x2450毫米，可按尺寸裁切。",
    },
    title: {
      th: "ฟิวเจอร์บอร์ดหนากี่มิลดี",
      en: "How thick should PP Board be?",
      ja: "PPボードの厚みの選び方",
      zh: "PP中空板该选多厚",
    },
    intro: {
      th: "ฟิวเจอร์บอร์ด PP Board และแผ่นพลาสติกลูกฟูก คือของชิ้นเดียวกัน ต่างกันแค่ชื่อเรียก แผ่นมาตรฐานของเราคือ 1300×2450 มม. (130×245 ซม.) ความหนา 2, 3, 4, 5 และ 10 มม. หรือที่เรียกกันว่า 2 มิล ถึง 10 มิล ตารางข้างล่างช่วยให้เลือกได้เร็วขึ้น",
      en: "Future Board, PP Board and corrugated plastic sheet are the same product under different names. Our standard sheet is 1300×2450 mm with thicknesses of 2, 3, 4, 5 and 10 mm. The table below narrows the choice down quickly.",
      ja: "フューチャーボード、PPボード、プラダンはいずれも同じ製品の別名です。標準サイズは1300×2450mm、厚みは2・3・4・5・10mmをご用意しています。",
      zh: "Future Board、PP中空板与瓦楞塑料板是同一种产品的不同叫法。标准板为1300×2450毫米，厚度有2、3、4、5、10毫米。",
    },
    tableTitle: {
      th: "เทียบความหนาแต่ละแบบ",
      en: "Thickness at a glance",
      ja: "厚みの比較",
      zh: "厚度对照",
    },
    colSpec: {
      th: "ความหนา",
      en: "Thickness",
      ja: "厚み",
      zh: "厚度",
    },
    colUse: {
      th: "เหมาะกับงาน",
      en: "Best for",
      ja: "適した用途",
      zh: "适用场景",
    },
    colNote: {
      th: "ข้อสังเกต",
      en: "Notes",
      ja: "備考",
      zh: "备注",
    },
    rows: [
      {
        spec: {
          th: "2 มม. (2 มิล)",
          en: "2 mm",
          ja: "2mm",
          zh: "2毫米",
        },
        use: {
          th: "ป้าย งานพิมพ์ แผ่นกั้นเบา",
          en: "Signage, printing, light dividers",
          ja: "看板・印刷物・軽い仕切り",
          zh: "标牌、印刷品、轻质隔板",
        },
        note: {
          th: "เบาและราคาต่ำที่สุด ไม่เหมาะรับน้ำหนัก",
          en: "Lightest and cheapest; not for load bearing",
          ja: "最も軽く安価。荷重には不向き",
          zh: "最轻最经济，不适合承重",
        },
      },
      {
        spec: {
          th: "3 มม. (3 มิล)",
          en: "3 mm",
          ja: "3mm",
          zh: "3毫米",
        },
        use: {
          th: "ไส้กั้นในกล่อง ถาดรองชิ้นงานเบา",
          en: "Box partitions, light part trays",
          ja: "箱の仕切り・軽量部品トレー",
          zh: "箱内隔板、轻件托盘",
        },
        note: {
          th: "ความหนายอดนิยมสำหรับงานไส้กั้น",
          en: "The usual pick for partitions",
          ja: "仕切りで最も多い厚み",
          zh: "隔板最常用厚度",
        },
      },
      {
        spec: {
          th: "4 มม. (4 มิล)",
          en: "4 mm",
          ja: "4mm",
          zh: "4毫米",
        },
        use: {
          th: "กล่องหมุนเวียนขนาดเล็กถึงกลาง",
          en: "Small to mid-size returnable boxes",
          ja: "小〜中型リターナブル箱",
          zh: "中小型周转箱",
        },
        note: {
          th: "สมดุลระหว่างน้ำหนักกับความแข็งแรง",
          en: "Balances weight against stiffness",
          ja: "軽さと剛性のバランスが良い",
          zh: "重量与刚性平衡",
        },
      },
      {
        spec: {
          th: "5 มม. (5 มิล)",
          en: "5 mm",
          ja: "5mm",
          zh: "5毫米",
        },
        use: {
          th: "กล่องหมุนเวียนใช้งานหนัก งานพับซ้ำบ่อย",
          en: "Heavy-duty returnable boxes, frequent folding",
          ja: "高頻度で折り返す耐久箱",
          zh: "重载周转箱、频繁折叠",
        },
        note: {
          th: "ทนรอบการพับได้มากกว่าแบบบาง",
          en: "Survives more fold cycles than thinner sheet",
          ja: "薄手より折り曲げ耐久性が高い",
          zh: "比薄板耐折次数更多",
        },
      },
      {
        spec: {
          th: "10 มม. (10 มิล)",
          en: "10 mm",
          ja: "10mm",
          zh: "10毫米",
        },
        use: {
          th: "แผ่นรองพื้น ผนังกั้น งานรับแรงกด",
          en: "Floor protection, partition walls, load spreading",
          ja: "床養生・間仕切り・荷重分散",
          zh: "地面防护、隔断墙、分散载荷",
        },
        note: {
          th: "แข็งที่สุด ขึ้นรูปเป็นกล่องยากกว่า",
          en: "Stiffest; harder to fold into boxes",
          ja: "最も硬く、箱に折るのは難しい",
          zh: "最硬，较难折成箱型",
        },
      },
    ],
    faqs: [
      {
        q: {
          th: "ฟิวเจอร์บอร์ดกับ PP Board ต่างกันไหม",
          en: "Is Future Board different from PP Board?",
          ja: "フューチャーボードとPPボードは違いますか",
          zh: "Future Board和PP中空板有区别吗",
        },
        a: {
          th: "ไม่ต่างกัน เป็นสินค้าตัวเดียวกัน บางที่เรียกแผ่นพลาสติกลูกฟูก บางที่เรียก Corrugated Plastic หรือพลาสติกลูกฟูก PP",
          en: "No — same product. It is also sold as corrugated plastic sheet or PP fluted board.",
          ja: "同じ製品です。プラダン、コルゲートプラスチックとも呼ばれます。",
          zh: "没有区别，同一产品，也叫瓦楞塑料板或PP中空板。",
        },
      },
      {
        q: {
          th: "โฟมบอร์ดกับฟิวเจอร์บอร์ดต่างกันยังไง",
          en: "What is the difference between foam board and PP Board?",
          ja: "フォームボードとPPボードの違いは",
          zh: "泡沫板和PP中空板有什么区别",
        },
        a: {
          th: "คนละวัสดุกัน โฟมบอร์ดคือแผ่นโฟมประกบกระดาษ เบามากแต่โดนน้ำแล้วเสีย ใช้ทำป้ายและงานโมเดล ส่วนฟิวเจอร์บอร์ดทำจากพลาสติก PP ทั้งแผ่น กันน้ำ 100% ล้างแล้วใช้ซ้ำได้ จึงเป็นตัวที่ใช้ทำกล่องหมุนเวียนและไส้กั้นในโรงงาน",
          en: "Different materials. Foam board is a foam core faced with paper — very light, used for signage and models, and ruined by water. PP Board is solid polypropylene: waterproof, washable and reusable, which is why factories use it for returnable boxes and partitions.",
          ja: "別素材です。フォームボードは紙で挟んだ発泡芯材で、軽い一方で水に弱く、看板や模型向けです。PPボードはポリプロピレン製で防水・洗浄可能なため、リターナブル箱や仕切りに使われます。",
          zh: "材质不同。泡沫板是纸面夹发泡芯，很轻但遇水即坏，用于标牌和模型。PP中空板为聚丙烯材质，防水、可清洗重复使用，因此工厂用它做周转箱和隔板。",
        },
      },
      {
        q: {
          th: "ขนาดแผ่นมาตรฐานเท่าไหร่ ตัดขนาดอื่นได้ไหม",
          en: "What is the standard sheet size? Can you cut to size?",
          ja: "標準サイズと、カット対応について",
          zh: "标准板尺寸是多少？可以裁切吗",
        },
        a: {
          th: "แผ่นมาตรฐาน 1300×2450 มม. หรือ 130×245 ซม. ตัดตามขนาดที่ต้องการได้ เช่น 120×240 ซม. หรือขนาดตามชิ้นงานของคุณ",
          en: "Standard sheets are 1300×2450 mm. We cut to whatever size your part needs, 1200×2400 mm included.",
          ja: "標準は1300×2450mmです。1200×2400mmなど、ご指定寸法にカットできます。",
          zh: "标准板1300×2450毫米，可按需裁切，如1200×2400毫米或按件定制。",
        },
      },
      {
        q: {
          th: "มีสีให้เลือกกี่สี",
          en: "How many colours are available?",
          ja: "色は何色ありますか",
          zh: "有多少种颜色可选",
        },
        a: {
          th: "มีให้เลือก 14 สี สีที่ใช้มากที่สุดในงานโรงงานคือสีดำกันไฟฟ้าสถิต สีน้ำเงิน และสีขาวขุ่น",
          en: "Fourteen colours. Factory work most often uses anti-static black, blue and natural white.",
          ja: "14色。工場向けでは静電気防止の黒、青、ナチュラルが多いです。",
          zh: "共14种颜色。工厂常用防静电黑色、蓝色和本色。",
        },
      },
      {
        q: {
          th: "ยังไม่แน่ใจว่าต้องใช้หนาเท่าไหร่",
          en: "Not sure which thickness you need?",
          ja: "厚みが決められない場合は",
          zh: "不确定该用多厚怎么办",
        },
        a: {
          th: "ส่งขนาดและน้ำหนักชิ้นงานมา พร้อมบอกว่าใช้หมุนเวียนในโรงงานหรือส่งออก เราแนะนำความหนาให้ และทำตัวอย่างให้ทดสอบก่อนผลิตจริง",
          en: "Send the part size and weight and say whether it is in-plant returnable or export. We will recommend a thickness and make a sample to test.",
          ja: "部品の寸法・重量と、工場内リターナブルか輸出用かをお知らせください。厚みをご提案し、試作をお作りします。",
          zh: "请提供产品尺寸重量，并说明是厂内周转还是出口。我们会推荐厚度并制作样品测试。",
        },
      },
    ],
  },
  {
    slug: "epe-foam-thickness",
    metaTitle: {
      th: "โฟมกันกระแทก EPE หนาเท่าไหร่ดี? เลือกความหนาให้ตรงงาน",
      en: "How Thick Should EPE Foam Be? A Selection Guide",
      ja: "EPEフォームの厚みの選び方",
      zh: "EPE防震泡棉该选多厚？选型指南",
    },
    metaDescription: {
      th: "เลือกความหนาโฟมกันกระแทก EPE และ EVA ตั้งแต่ห่อกันรอย 1-2 มม. จนถึงไดคัทรับชิ้นงานหนัก พร้อมเกรดกันไฟฟ้าสถิตสำหรับงานอิเล็กทรอนิกส์",
      en: "Choose EPE and EVA foam thickness — from 1–2 mm scratch wrap to die-cut cavities for heavy parts — including anti-static grades.",
      ja: "EPE・EVAフォームの厚み選定ガイド。1〜2mmの擦り傷防止から、重量部品用の抜き加工まで。静電気防止グレードも。",
      zh: "EPE与EVA泡棉厚度选型：从1-2毫米防刮包裹到重件刀模成型，含防静电等级。",
    },
    title: {
      th: "โฟมกันกระแทกหนาเท่าไหร่ดี",
      en: "How thick should protective foam be?",
      ja: "緩衝フォームの厚みの選び方",
      zh: "防震泡棉该选多厚",
    },
    intro: {
      th: "โฟม EPE และ EVA ผลิตได้ทั้งแบบแผ่น ม้วน ถุง และไดคัทตามแบบชิ้นงาน ความหนาที่เลือกขึ้นกับน้ำหนักชิ้นงานและระยะทางขนส่ง ตารางข้างล่างคือความหนาที่นิยมใช้ในงานโรงงาน ถ้าต้องการความหนาอื่นสั่งผลิตได้",
      en: "EPE and EVA foam come as sheets, rolls, bags and die-cut inserts. Thickness follows part weight and how far it travels. Below are the thicknesses factories use most; others can be made to order.",
      ja: "EPE・EVAフォームはシート、ロール、袋、抜き加工に対応します。厚みは部品重量と輸送距離で決まります。以下は工場でよく使われる厚みです。",
      zh: "EPE与EVA泡棉可做成片材、卷材、袋子和刀模成型件。厚度取决于产品重量和运输距离。下表为工厂常用厚度，其他厚度可定制。",
    },
    tableTitle: {
      th: "ความหนาที่นิยมใช้",
      en: "Commonly used thicknesses",
      ja: "よく使われる厚み",
      zh: "常用厚度",
    },
    colSpec: {
      th: "ความหนา",
      en: "Thickness",
      ja: "厚み",
      zh: "厚度",
    },
    colUse: {
      th: "เหมาะกับงาน",
      en: "Best for",
      ja: "適した用途",
      zh: "适用场景",
    },
    colNote: {
      th: "ข้อสังเกต",
      en: "Notes",
      ja: "備考",
      zh: "备注",
    },
    rows: [
      {
        spec: {
          th: "1-2 มม.",
          en: "1–2 mm",
          ja: "1〜2mm",
          zh: "1-2毫米",
        },
        use: {
          th: "ห่อผิวชิ้นงานกันรอยขีดข่วน",
          en: "Surface wrap against scratches",
          ja: "表面の擦り傷防止",
          zh: "表面防刮包裹",
        },
        note: {
          th: "บางที่สุด เน้นกันรอย ไม่ได้กันกระแทก",
          en: "Scratch protection only, not impact",
          ja: "擦り傷防止のみ。衝撃吸収は不可",
          zh: "仅防刮，不防冲击",
        },
      },
      {
        spec: {
          th: "3-5 มม.",
          en: "3–5 mm",
          ja: "3〜5mm",
          zh: "3-5毫米",
        },
        use: {
          th: "ห่อกันรอยพร้อมกันกระแทกเบา",
          en: "Wrap plus light impact protection",
          ja: "擦り傷防止＋軽い緩衝",
          zh: "防刮加轻度缓冲",
        },
        note: {
          th: "ใช้มากในงานอิเล็กทรอนิกส์และชิ้นส่วนเล็ก",
          en: "Common for electronics and small parts",
          ja: "電子部品や小物に多い",
          zh: "常用于电子件和小型零件",
        },
      },
      {
        spec: {
          th: "10 มม. (1 ซม.)",
          en: "10 mm",
          ja: "10mm",
          zh: "10毫米",
        },
        use: {
          th: "ไส้กั้น รองก้นกล่อง แผ่นคั่นชั้น",
          en: "Partitions, box bottoms, layer pads",
          ja: "仕切り・底敷き・段積みパッド",
          zh: "隔板、箱底垫、层间垫",
        },
        note: {
          th: "ความหนายอดนิยมสำหรับงานทั่วไป",
          en: "The most common general-purpose thickness",
          ja: "汎用で最も多い厚み",
          zh: "通用场景最常用",
        },
      },
      {
        spec: {
          th: "20-25 มม.",
          en: "20–25 mm",
          ja: "20〜25mm",
          zh: "20-25毫米",
        },
        use: {
          th: "ไดคัทเป็นหลุมรับชิ้นงาน",
          en: "Die-cut cavities that hold the part",
          ja: "部品形状に合わせた抜き加工",
          zh: "刀模成型，卡住产品",
        },
        note: {
          th: "ขึ้นรูปตามชิ้นงานได้ ชิ้นงานไม่ขยับในกล่อง",
          en: "Shaped to the part so it cannot shift",
          ja: "形状に合わせ、箱内で動かない",
          zh: "按件成型，产品不移位",
        },
      },
      {
        spec: {
          th: "30-50 มม.",
          en: "30–50 mm",
          ja: "30〜50mm",
          zh: "30-50毫米",
        },
        use: {
          th: "ชิ้นงานหนัก มุมกันกระแทก งานส่งออก",
          en: "Heavy parts, corner protectors, export",
          ja: "重量物・コーナー材・輸出梱包",
          zh: "重件、护角、出口包装",
        },
        note: {
          th: "รับแรงกระแทกได้สูงสุดในกลุ่มนี้",
          en: "Highest impact absorption of the range",
          ja: "この範囲で最も衝撃吸収が高い",
          zh: "该范围内吸震能力最强",
        },
      },
    ],
    faqs: [
      {
        q: {
          th: "EPE กับ EVA ต่างกันยังไง",
          en: "What is the difference between EPE and EVA?",
          ja: "EPEとEVAの違いは",
          zh: "EPE和EVA有什么区别",
        },
        a: {
          th: "EPE นุ่มกว่า คืนตัวดี เหมาะกับงานห่อและกันกระแทกทั่วไป ส่วน EVA แน่นและแข็งกว่า เหมาะกับงานไดคัทที่ต้องการให้ทรงอยู่ตัว",
          en: "EPE is softer and springs back, suited to wrapping and general cushioning. EVA is denser and firmer, suited to die-cut inserts that must hold their shape.",
          ja: "EPEは柔らかく復元性が高く、包装や一般的な緩衝に適します。EVAは密度が高く硬いため、形状を保つ抜き加工に適します。",
          zh: "EPE较软、回弹好，适合包裹和一般缓冲；EVA密度高较硬，适合需要保持形状的刀模件。",
        },
      },
      {
        q: {
          th: "มีเกรดกันไฟฟ้าสถิตไหม",
          en: "Do you have anti-static grades?",
          ja: "静電気防止グレードはありますか",
          zh: "有防静电等级吗",
        },
        a: {
          th: "มี สำหรับงานอิเล็กทรอนิกส์และชิ้นส่วนที่ไวต่อไฟฟ้าสถิต แจ้งมาตอนขอราคาว่าต้องใช้เกรดกันไฟฟ้าสถิต",
          en: "Yes, for electronics and ESD-sensitive parts. Say so when you ask for a quote.",
          ja: "はい。電子部品やESD対策が必要な部品向けにご用意しています。お見積り時にお申し付けください。",
          zh: "有，用于电子和静电敏感产品。询价时请注明。",
        },
      },
      {
        q: {
          th: "ทำเป็นถุงหรือไดคัทตามแบบได้ไหม",
          en: "Can you make bags or die-cut shapes?",
          ja: "袋や抜き加工は可能ですか",
          zh: "可以做成袋子或刀模件吗",
        },
        a: {
          th: "ได้ทั้งงานถุง งานแผ่น งานม้วน และไดคัทตามแบบชิ้นงาน ส่งรูปถ่ายหรือแบบมาให้ดูได้",
          en: "Yes — bags, sheets, rolls and die-cut to your drawing. Send a photo or drawing.",
          ja: "袋・シート・ロール・図面に基づく抜き加工まで対応します。写真か図面をお送りください。",
          zh: "可以：袋子、片材、卷材及按图刀模成型。请发照片或图纸。",
        },
      },
      {
        q: {
          th: "ไม่รู้ว่าต้องใช้หนาเท่าไหร่",
          en: "Not sure which thickness you need?",
          ja: "厚みが決められない場合は",
          zh: "不确定该用多厚怎么办",
        },
        a: {
          th: "บอกน้ำหนักและขนาดชิ้นงาน พร้อมวิธีขนส่ง เราแนะนำความหนาและความหนาแน่นให้ และทำตัวอย่างให้ทดสอบกับชิ้นงานจริงก่อนผลิต",
          en: "Tell us the part weight, size and how it ships. We will recommend thickness and density, and make a sample to test against the real part.",
          ja: "部品の重量・寸法・輸送方法をお知らせください。厚みと密度をご提案し、実物でテストできる試作をお作りします。",
          zh: "请告知产品重量、尺寸和运输方式。我们会推荐厚度与密度，并制作样品供实物测试。",
        },
      },
    ],
  },
];
