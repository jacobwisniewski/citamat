import { useLocation } from "react-router-dom";
import type { Locale } from "../data/site";

export const useLocale = (): Locale => {
  const { pathname } = useLocation();
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
};

export const withLocale = (path: string, locale: Locale): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "zh" ? `/zh${normalized === "/" ? "" : normalized}` : normalized;
};
