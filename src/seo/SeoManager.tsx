import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  buildStructuredData,
  getSeoEntry,
  siteUrl,
  socialImagePath,
  toAbsoluteUrl,
} from "./config";

const setMeta = (key: "name" | "property", value: string, content: string): void => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, value);
    document.head.append(element);
  }
  element.content = content;
};

const setLink = (rel: string, href: string, hreflang?: string): void => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.append(element);
  }
  element.href = href;
};

export const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const entry = getSeoEntry(location.pathname);
    const canonical = toAbsoluteUrl(entry.path);
    const englishPath = entry.locale === "en" ? entry.path : entry.alternatePath;
    const chinesePath = entry.locale === "zh" ? entry.path : entry.alternatePath;

    document.documentElement.lang = entry.locale === "zh" ? "zh-CN" : "en-AU";
    document.title = entry.title;
    setMeta("name", "description", entry.description);
    setMeta("name", "robots", entry.indexable ? "index, follow" : "noindex, nofollow");
    setMeta("property", "og:type", entry.kind === "product" ? "product" : "website");
    setMeta("property", "og:site_name", "CITAMAT Australia");
    setMeta("property", "og:locale", entry.locale === "zh" ? "zh_CN" : "en_AU");
    setMeta("property", "og:title", entry.title);
    setMeta("property", "og:description", entry.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", `${siteUrl}${socialImagePath}`);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", entry.imageAlt);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", entry.title);
    setMeta("name", "twitter:description", entry.description);
    setMeta("name", "twitter:image", `${siteUrl}${socialImagePath}`);
    setLink("canonical", canonical);
    setLink("alternate", toAbsoluteUrl(englishPath), "en-AU");
    setLink("alternate", toAbsoluteUrl(chinesePath), "zh-CN");
    setLink("alternate", toAbsoluteUrl(englishPath), "x-default");

    let structuredData = document.head.querySelector<HTMLScriptElement>("#seo-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "seo-structured-data";
      structuredData.type = "application/ld+json";
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(buildStructuredData(entry)).replaceAll(
      "<",
      "\\u003c",
    );

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
};
