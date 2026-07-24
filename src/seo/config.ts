import { brands, products, t, type Locale } from "../data/site";

export const siteUrl = "https://citamat.jacobwisniewski.dev";
export const socialImagePath = "/brand/citamat-og.jpg";

type SeoKind = "about" | "collection" | "contact" | "home" | "page" | "product";

export type Breadcrumb = {
  name: string;
  path: string;
};

export type SeoEntry = {
  alternatePath: string;
  breadcrumbs: Breadcrumb[];
  description: string;
  image: string;
  imageAlt: string;
  indexable: boolean;
  kind: SeoKind;
  locale: Locale;
  path: string;
  title: string;
  entitySlug?: string;
};

type LocalizedPage = {
  en: {
    description: string;
    title: string;
  };
  path: string;
  zh: {
    description: string;
    title: string;
  };
  kind: SeoKind;
};

const localizedPages: LocalizedPage[] = [
  {
    path: "/",
    kind: "home",
    en: {
      title: "CITAMAT Australia | Building Material Systems",
      description:
        "Explore waterproofing, composite timber and decorative finish systems for Australian residential and commercial projects.",
    },
    zh: {
      title: "CITAMAT 澳大利亚 | 建筑材料系统",
      description: "探索适用于澳大利亚住宅与商业项目的防水、塑木和装饰饰面系统。",
    },
  },
  {
    path: "/products",
    kind: "collection",
    en: {
      title: "Building Products | CITAMAT Australia",
      description:
        "Compare CITAMAT waterproofing coatings, composite decking and decorative finishes by brand and application.",
    },
    zh: {
      title: "建筑产品 | CITAMAT 澳大利亚",
      description: "按品牌与应用比较 CITAMAT 防水涂料、塑木地板和装饰饰面产品。",
    },
  },
  {
    path: "/residential",
    kind: "page",
    en: {
      title: "Residential Building Solutions | CITAMAT",
      description:
        "Explore material systems for Australian homes, apartments, wet areas, balconies and outdoor living spaces.",
    },
    zh: {
      title: "住宅建筑解决方案 | CITAMAT",
      description: "探索适用于澳大利亚住宅、公寓、湿区、阳台与户外生活空间的材料系统。",
    },
  },
  {
    path: "/commercial",
    kind: "page",
    en: {
      title: "Commercial Building Solutions | CITAMAT",
      description:
        "Explore durable building material systems for commercial interiors, façades, roofs and public projects.",
    },
    zh: {
      title: "商业建筑解决方案 | CITAMAT",
      description: "探索适用于商业室内、立面、屋面和公共项目的耐用建筑材料系统。",
    },
  },
  {
    path: "/about",
    kind: "about",
    en: {
      title: "About CITAMAT Australia",
      description:
        "Learn how CITAMAT helps Australian project teams select building materials with clear product and application guidance.",
    },
    zh: {
      title: "关于 CITAMAT 澳大利亚",
      description: "了解 CITAMAT 如何通过清晰的产品与应用建议协助澳大利亚项目团队选材。",
    },
  },
  {
    path: "/contact",
    kind: "contact",
    en: {
      title: "Contact CITAMAT Australia",
      description:
        "Contact CITAMAT in Burwood, Victoria for building product information and project recommendations.",
    },
    zh: {
      title: "联系 CITAMAT 澳大利亚",
      description: "联系位于维多利亚州 Burwood 的 CITAMAT，获取产品信息与项目选材建议。",
    },
  },
];

const localizedPath = (path: string, locale: Locale): string =>
  locale === "zh" ? `/zh${path === "/" ? "" : path}` : path;

const rootBreadcrumb = (locale: Locale): Breadcrumb => ({
  name: locale === "zh" ? "首页" : "Home",
  path: localizedPath("/", locale),
});

const createStaticEntries = (): SeoEntry[] =>
  localizedPages.flatMap((page) =>
    (["en", "zh"] as const).map((locale) => ({
      alternatePath: localizedPath(page.path, locale === "en" ? "zh" : "en"),
      breadcrumbs:
        page.path === "/"
          ? []
          : [
              rootBreadcrumb(locale),
              {
                name: page[locale].title.split(" | ")[0] ?? page[locale].title,
                path: localizedPath(page.path, locale),
              },
            ],
      description: page[locale].description,
      image: socialImagePath,
      imageAlt:
        locale === "zh" ? "CITAMAT 建筑材料产品系列" : "CITAMAT building material product range",
      indexable: true,
      kind: page.kind,
      locale,
      path: localizedPath(page.path, locale),
      title: page[locale].title,
    })),
  );

const createProductEntries = (): SeoEntry[] =>
  products.flatMap((product) =>
    (["en", "zh"] as const).map((locale) => {
      const path = localizedPath(`/products/${product.slug}`, locale);
      return {
        alternatePath: localizedPath(`/products/${product.slug}`, locale === "en" ? "zh" : "en"),
        breadcrumbs: [
          rootBreadcrumb(locale),
          {
            name: locale === "zh" ? "产品" : "Products",
            path: localizedPath("/products", locale),
          },
          { name: product.name, path },
        ],
        description: t(product.summary, locale),
        entitySlug: product.slug,
        image: product.image,
        imageAlt: `${product.name} ${locale === "zh" ? "产品包装" : "product packaging"}`,
        indexable: true,
        kind: "product" as const,
        locale,
        path,
        title: `${product.name} | CITAMAT`,
      };
    }),
  );

export const seoRoutes: SeoEntry[] = [...createStaticEntries(), ...createProductEntries()];

const normalizePath = (pathname: string): string => {
  const path = pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return path || "/";
};

export const getSeoEntry = (pathname: string): SeoEntry => {
  const path = normalizePath(pathname);
  const found = seoRoutes.find((entry) => entry.path === path);
  if (found) return found;

  const locale: Locale = path === "/zh" || path.startsWith("/zh/") ? "zh" : "en";
  return {
    alternatePath: locale === "zh" ? "/" : "/zh",
    breadcrumbs: [],
    description:
      locale === "zh" ? "您访问的页面不存在。" : "The page you requested could not be found.",
    image: socialImagePath,
    imageAlt: "CITAMAT",
    indexable: false,
    kind: "page",
    locale,
    path,
    title: locale === "zh" ? "页面未找到 | CITAMAT" : "Page not found | CITAMAT",
  };
};

const absoluteUrl = (path: string): string => `${siteUrl}${path === "/" ? "" : path}`;

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "CITAMAT Australia",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand/citamat-mark.svg`,
  },
  email: "info@citamat.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7 Alexander Drive",
    addressLocality: "Burwood",
    addressRegion: "VIC",
    postalCode: "3125",
    addressCountry: "AU",
  },
};

const breadcrumbSchema = (entry: SeoEntry) => ({
  "@type": "BreadcrumbList",
  itemListElement: entry.breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const pageType = (kind: SeoKind): string => {
  if (kind === "about") return "AboutPage";
  if (kind === "contact") return "ContactPage";
  if (kind === "collection") return "CollectionPage";
  return "WebPage";
};

export const buildStructuredData = (entry: SeoEntry): Record<string, unknown> => {
  const graph: Record<string, unknown>[] = [
    {
      "@type": pageType(entry.kind),
      "@id": `${absoluteUrl(entry.path)}#webpage`,
      url: absoluteUrl(entry.path),
      name: entry.title,
      description: entry.description,
      inLanguage: entry.locale === "zh" ? "zh-CN" : "en-AU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(entry.image),
      },
    },
  ];

  if (entry.breadcrumbs.length > 0) graph.push(breadcrumbSchema(entry));

  if (entry.kind === "home") {
    graph.push(
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CITAMAT Australia",
        inLanguage: ["en-AU", "zh-CN"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      organization,
    );
  }

  if (entry.kind === "about") graph.push(organization);

  if (entry.kind === "product" && entry.entitySlug) {
    const product = products.find(({ slug }) => slug === entry.entitySlug);
    const brand = product ? brands.find(({ slug }) => slug === product.brand) : undefined;
    if (product) {
      graph.push({
        "@type": "Product",
        "@id": `${absoluteUrl(entry.path)}#product`,
        name: product.name,
        description: t(product.summary, entry.locale),
        image: absoluteUrl(product.image),
        category: product.category,
        brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
        url: absoluteUrl(entry.path),
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const toAbsoluteUrl = absoluteUrl;
