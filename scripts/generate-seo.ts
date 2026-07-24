import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  buildStructuredData,
  seoRoutes,
  siteUrl,
  socialImagePath,
  toAbsoluteUrl,
  type SeoEntry,
} from "../src/seo/config";
import { products, t } from "../src/data/site";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");
const seoStart = "<!-- SEO_START -->";
const seoEnd = "<!-- SEO_END -->";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeXml = (value: string): string => escapeHtml(value).replaceAll("'", "&apos;");

const seoMarkup = (entry: SeoEntry): string => {
  const canonical = toAbsoluteUrl(entry.path);
  const englishPath = entry.locale === "en" ? entry.path : entry.alternatePath;
  const chinesePath = entry.locale === "zh" ? entry.path : entry.alternatePath;
  const locale = entry.locale === "zh" ? "zh_CN" : "en_AU";
  const alternateLocale = entry.locale === "zh" ? "en_AU" : "zh_CN";
  const title = escapeHtml(entry.title);
  const description = escapeHtml(entry.description);
  const imageAlt = escapeHtml(entry.imageAlt);
  const structuredData = JSON.stringify(buildStructuredData(entry)).replaceAll("<", "\\u003c");

  return `${seoStart}
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en-AU" href="${toAbsoluteUrl(englishPath)}" />
    <link rel="alternate" hreflang="zh-CN" href="${toAbsoluteUrl(chinesePath)}" />
    <link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(englishPath)}" />
    <meta property="og:type" content="${entry.kind === "product" ? "product" : "website"}" />
    <meta property="og:site_name" content="CITAMAT Australia" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:locale:alternate" content="${alternateLocale}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}${socialImagePath}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${imageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}${socialImagePath}" />
    <script id="seo-structured-data" type="application/ld+json">${structuredData}</script>
    ${seoEnd}`;
};

const injectSeo = (template: string, entry: SeoEntry): string => {
  const expression = new RegExp(`${seoStart}[\\s\\S]*?${seoEnd}`);
  return template
    .replace('<html lang="en">', `<html lang="${entry.locale === "zh" ? "zh-CN" : "en-AU"}">`)
    .replace(expression, seoMarkup(entry));
};

const writeRouteHtml = async (template: string, entry: SeoEntry): Promise<void> => {
  const html = injectSeo(template, entry);
  if (entry.path === "/") {
    await writeFile(indexPath, html);
    return;
  }

  const cleanPath = entry.path.replace(/^\//, "");
  const directoryPath = join(distDirectory, cleanPath, "index.html");
  const filePath = join(distDirectory, `${cleanPath}.html`);
  await mkdir(dirname(directoryPath), { recursive: true });
  await writeFile(directoryPath, html);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
};

const createSitemap = (): string => {
  const entries = seoRoutes
    .map((entry) => {
      const englishPath = entry.locale === "en" ? entry.path : entry.alternatePath;
      const chinesePath = entry.locale === "zh" ? entry.path : entry.alternatePath;
      return `  <url>
    <loc>${escapeXml(toAbsoluteUrl(entry.path))}</loc>
    <xhtml:link rel="alternate" hreflang="en-AU" href="${escapeXml(toAbsoluteUrl(englishPath))}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(toAbsoluteUrl(chinesePath))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(toAbsoluteUrl(englishPath))}" />
    <lastmod>2026-07-24</lastmod>
    <image:image>
      <image:loc>${escapeXml(toAbsoluteUrl(entry.image))}</image:loc>
      <image:title>${escapeXml(entry.imageAlt)}</image:title>
    </image:image>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`;
};

const createLlmsText = (locale: "en" | "zh"): string => {
  const prefix = locale === "zh" ? "/zh" : "";
  const lines = [
    `# CITAMAT Australia`,
    "",
    locale === "zh"
      ? "CITAMAT 为澳大利亚住宅与商业项目提供防水、塑木和装饰饰面产品信息与选材建议。"
      : "CITAMAT provides product information and selection guidance for waterproofing, composite timber and decorative finishes in Australian residential and commercial projects.",
    "",
    `- [${locale === "zh" ? "产品" : "Products"}](${siteUrl}${prefix}/products)`,
    `- [${locale === "zh" ? "关于我们" : "About"}](${siteUrl}${prefix}/about)`,
    `- [${locale === "zh" ? "联系我们" : "Contact"}](${siteUrl}${prefix}/contact)`,
    "",
    `## ${locale === "zh" ? "产品" : "Products"}`,
    "",
    ...products.map(
      (product) =>
        `- [${product.name}](${siteUrl}${prefix}/products/${product.slug}): ${t(product.summary, locale)}`,
    ),
    "",
    locale === "zh"
      ? "联系：info@citamat.com，7 Alexander Drive, Burwood VIC 3125, Australia"
      : "Contact: info@citamat.com, 7 Alexander Drive, Burwood VIC 3125, Australia",
    "",
  ];
  return lines.join("\n");
};

const run = async (): Promise<void> => {
  const template = await readFile(indexPath, "utf8");
  if (!template.includes(seoStart) || !template.includes(seoEnd)) {
    throw new Error("SEO markers are missing from dist/index.html");
  }

  await Promise.all(seoRoutes.map((entry) => writeRouteHtml(template, entry)));
  await Promise.all([
    writeFile(join(distDirectory, "sitemap.xml"), createSitemap()),
    writeFile(
      join(distDirectory, "robots.txt"),
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    ),
    writeFile(join(distDirectory, "llms.txt"), createLlmsText("en")),
    mkdir(join(distDirectory, "zh"), { recursive: true }).then(() =>
      writeFile(join(distDirectory, "zh", "llms.txt"), createLlmsText("zh")),
    ),
  ]);
};

await run();
