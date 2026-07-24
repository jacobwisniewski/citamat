export type Locale = "en" | "zh";

export type Localized = {
  en: string;
  zh: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: "waterproofing" | "composite" | "decorative";
  summary: Localized;
  features: Localized[];
  applications: Localized[];
  image: string;
};

export type Brand = {
  slug: string;
  name: string;
  category: Localized;
  description: Localized;
  logo: string;
};

export const copy = {
  nav: {
    home: { en: "Home", zh: "首页" },
    products: { en: "Products", zh: "产品" },
    solutions: { en: "Solutions", zh: "解决方案" },
    brands: { en: "Brands", zh: "品牌" },
    projects: { en: "Projects", zh: "项目案例" },
    about: { en: "About", zh: "关于我们" },
    contact: { en: "Contact", zh: "联系我们" },
  },
  common: {
    enquire: { en: "Get a project recommendation", zh: "获取项目选材建议" },
    explore: { en: "Explore products", zh: "查看产品" },
    view: { en: "View details", zh: "查看详情" },
    all: { en: "All products", zh: "全部产品" },
  },
} as const;

export const brands: Brand[] = [
  {
    slug: "oriental-yuhong",
    name: "Oriental Yuhong",
    category: { en: "Waterproofing systems", zh: "防水系统" },
    description: {
      en: "Integrated waterproofing membranes and coatings selected for demanding building envelopes.",
      zh: "面向高要求建筑围护系统的防水卷材与涂层解决方案。",
    },
    logo: "/images/oriental-yuhong.svg",
  },
  {
    slug: "conch",
    name: "Conch",
    category: { en: "Composite wood", zh: "塑木" },
    description: {
      en: "Low-maintenance composite timber for Australian decks, façades and outdoor spaces.",
      zh: "适用于澳大利亚露台、立面与户外空间的低维护塑木产品。",
    },
    logo: "/images/conch.png",
  },
  {
    slug: "rainbark",
    name: "rainbARK®",
    category: { en: "Decorative finishes", zh: "装饰涂料" },
    description: {
      en: "Architectural textures and finishes designed to give interiors a distinctive material character.",
      zh: "以独特材质表现力塑造室内空间的建筑肌理与饰面系统。",
    },
    logo: "/images/rainbark.avif",
  },
];

export const products: Product[] = [
  {
    slug: "yhcoat-1300",
    name: "YHCoat 1300",
    brand: "oriental-yuhong",
    category: "waterproofing",
    summary: {
      en: "Flexible two-component cementitious waterproofing coating.",
      zh: "柔性双组份水泥基防水涂料。",
    },
    features: [
      { en: "Flexible two-part system", zh: "双组分柔性防水" },
      { en: "Designed for internal wet areas", zh: "室内湿区专用" },
      { en: "Low-VOC and easy to apply", zh: "低 VOC、易施工" },
    ],
    applications: [
      { en: "Bathrooms", zh: "浴室" },
      { en: "Kitchens", zh: "厨房" },
      { en: "Balconies", zh: "阳台" },
    ],
    image: "/images/yhcoat-1300.avif",
  },
  {
    slug: "yhcolor-wall-coat-5300",
    name: "YHColor Wall Coat 5300",
    brand: "oriental-yuhong",
    category: "waterproofing",
    summary: {
      en: "UV-resistant water-based elastomeric waterproofing coating.",
      zh: "抗紫外线水性弹性防水涂料。",
    },
    features: [
      { en: "UV-resistant elastomeric finish", zh: "抗 UV 水性弹性防水" },
      { en: "For external walls and roofs", zh: "外墙与屋面适用" },
      { en: "Single-component application", zh: "单组份易施工" },
    ],
    applications: [
      { en: "External walls", zh: "外墙" },
      { en: "Roofs", zh: "屋面" },
      { en: "Concrete substrates", zh: "混凝土基面" },
    ],
    image: "/images/yhcolor-5300.avif",
  },
  {
    slug: "yh-bitucoat-4600",
    name: "YH Bitucoat 4600",
    brand: "oriental-yuhong",
    category: "waterproofing",
    summary: { en: "Water-based bituminous waterproofing coating.", zh: "水性沥青防水涂料。" },
    features: [
      { en: "Water-based elastic membrane", zh: "水性沥青弹性防水" },
      { en: "Roof and below-ground use", zh: "屋面与地下工程适用" },
      { en: "High crack-bridging ability", zh: "高裂纹桥接性" },
    ],
    applications: [
      { en: "Foundations", zh: "地基" },
      { en: "Retaining walls", zh: "挡土墙" },
      { en: "Roofs", zh: "屋面" },
    ],
    image: "/images/yh-bitucoat-4600.avif",
  },
  {
    slug: "conch-decking",
    name: "Conch Composite Decking",
    brand: "conch",
    category: "composite",
    summary: {
      en: "Durable, low-maintenance boards for decks and outdoor living.",
      zh: "适用于露台与户外生活空间的耐用低维护板材。",
    },
    features: [
      { en: "Timber-look finish", zh: "自然木纹外观" },
      { en: "Moisture and UV resistant", zh: "防潮抗紫外线" },
      { en: "Low ongoing maintenance", zh: "日常维护简单" },
    ],
    applications: [
      { en: "Decks", zh: "露台地板" },
      { en: "Pool surrounds", zh: "泳池周边" },
      { en: "Commercial terraces", zh: "商业露台" },
    ],
    image: "/images/composite.avif",
  },
  {
    slug: "rainbark-premium-colour",
    name: "rainbARK® PremiumColour",
    brand: "rainbark",
    category: "decorative",
    summary: {
      en: "Premium interior wall paint presented in a practical 15-litre format.",
      zh: "采用实用 15 升包装的优质室内墙面涂料。",
    },
    features: [
      { en: "Interior wall finish", zh: "室内墙面饰面" },
      { en: "15-litre format", zh: "15 升包装" },
      { en: "Clear branded presentation", zh: "清晰品牌识别" },
    ],
    applications: [
      { en: "Residential interiors", zh: "住宅室内" },
      { en: "Hospitality", zh: "酒店餐饮" },
      { en: "Retail", zh: "零售空间" },
    ],
    image: "/images/rainbark-premium-colour.avif",
  },
];

export const categories = [
  {
    slug: "waterproof-paint",
    category: "waterproofing" as const,
    icon: "01",
    title: { en: "Waterproofing", zh: "防水系统" },
    text: {
      en: "Coatings and membranes selected around substrate, exposure and programme.",
      zh: "根据基面、暴露环境与工期选择涂层及卷材系统。",
    },
  },
  {
    slug: "composite-wood",
    category: "composite" as const,
    icon: "02",
    title: { en: "Composite wood", zh: "塑木系统" },
    text: {
      en: "Durable external surfaces with the warmth of timber and less maintenance.",
      zh: "兼具木材温度与低维护优势的耐用户外表面。",
    },
  },
  {
    slug: "decorative-paint",
    category: "decorative" as const,
    icon: "03",
    title: { en: "Decorative finishes", zh: "装饰饰面" },
    text: {
      en: "Texture, tone and finish systems for expressive residential and commercial interiors.",
      zh: "适用于住宅及商业空间的肌理、色彩与饰面系统。",
    },
  },
];

export const projects = [
  {
    slug: "brisbane-stadium",
    name: { en: "Brisbane Stadium", zh: "布里斯班体育场" },
    type: { en: "Sport & public", zh: "体育与公共空间" },
    image: "/images/project-1.avif",
  },
  {
    slug: "melbourne-center",
    name: { en: "Melbourne Centre", zh: "墨尔本中心" },
    type: { en: "Commercial interior", zh: "商业室内" },
    image: "/images/project-2.avif",
  },
  {
    slug: "sydney-apartment",
    name: { en: "Sydney Apartments", zh: "悉尼公寓" },
    type: { en: "Multi-residential", zh: "多户住宅" },
    image: "/images/project-3.avif",
  },
];

export const t = (value: Localized, locale: Locale): string => value[locale];
