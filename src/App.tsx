import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Catalog } from "./pages/Catalog";
import { ContentPage } from "./pages/ContentPages";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound, ProductDetail } from "./pages/ProductDetail";
import { SeoManager } from "./seo/SeoManager";

const RouteSet = ({ prefix = "" }: { prefix?: string }) => (
  <>
    <Route path={`${prefix}/`} element={<Home />} />
    <Route path={`${prefix}/products`} element={<Catalog />} />
    <Route path={`${prefix}/products/:slug`} element={<ProductDetail />} />
    <Route path={`${prefix}/about`} element={<ContentPage kind="about" />} />
    <Route path={`${prefix}/residential`} element={<ContentPage kind="residential" />} />
    <Route path={`${prefix}/commercial`} element={<ContentPage kind="commercial" />} />
    <Route path={`${prefix}/contact`} element={<Contact />} />
    <Route path={`${prefix}/paint`} element={<Catalog />} />
    <Route path={`${prefix}/waterproof-paint`} element={<Catalog />} />
    <Route path={`${prefix}/decorative-paint`} element={<Catalog />} />
    <Route path={`${prefix}/composite-wood`} element={<Catalog />} />
    <Route path={`${prefix}/doors`} element={<Catalog />} />
    <Route path={`${prefix}/windows`} element={<Catalog />} />
  </>
);

export const App = () => (
  <Layout>
    <SeoManager />
    <Routes>
      {RouteSet({})}
      {RouteSet({ prefix: "/zh" })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);
