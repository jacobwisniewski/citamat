import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useLocale } from "./hooks/useLocale";
import { BrandDetail, Brands } from "./pages/Brands";
import { Catalog } from "./pages/Catalog";
import { CaseStudy, ContentPage } from "./pages/ContentPages";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound, ProductDetail } from "./pages/ProductDetail";

const RouteSet = ({ prefix = "" }: { prefix?: string }) => (
  <>
    <Route path={`${prefix}/`} element={<Home />} />
    <Route path={`${prefix}/products`} element={<Catalog />} />
    <Route path={`${prefix}/products/:slug`} element={<ProductDetail />} />
    <Route path={`${prefix}/products/brand/:slug`} element={<BrandDetail />} />
    <Route path={`${prefix}/brands`} element={<Brands />} />
    <Route path={`${prefix}/brands/:slug`} element={<BrandDetail />} />
    <Route path={`${prefix}/about`} element={<ContentPage kind="about" />} />
    <Route path={`${prefix}/solutions`} element={<ContentPage kind="solutions" />} />
    <Route path={`${prefix}/residential`} element={<ContentPage kind="residential" />} />
    <Route path={`${prefix}/commercial`} element={<ContentPage kind="commercial" />} />
    <Route path={`${prefix}/projects`} element={<ContentPage kind="projects" />} />
    <Route path={`${prefix}/cases/:slug`} element={<CaseStudy />} />
    <Route path={`${prefix}/contact`} element={<Contact />} />
    <Route path={`${prefix}/paint`} element={<Catalog />} />
    <Route path={`${prefix}/waterproof-paint`} element={<Catalog />} />
    <Route path={`${prefix}/decorative-paint`} element={<Catalog />} />
    <Route path={`${prefix}/composite-wood`} element={<Catalog />} />
    <Route path={`${prefix}/doors`} element={<Catalog />} />
    <Route path={`${prefix}/windows`} element={<Catalog />} />
    <Route path={`${prefix}/rainbark`} element={<BrandDetail fixedSlug="rainbark" />} />
    <Route path={`${prefix}/rainbark/info/:slug`} element={<BrandDetail fixedSlug="rainbark" />} />
  </>
);

const PageEffects = () => {
  const locale = useLocale();
  const location = useLocation();
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title =
      locale === "zh" ? "CITAMAT 澳大利亚建筑材料" : "CITAMAT Australia | Building Materials";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [locale, location.pathname]);
  return null;
};

export const App = () => (
  <Layout>
    <PageEffects />
    <Routes>
      {RouteSet({})}
      {RouteSet({ prefix: "/zh" })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);
