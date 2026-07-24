import { seoRoutes } from "../src/seo/config";

type Env = {
  ASSETS: Fetcher;
};

const knownPaths = new Set(seoRoutes.map(({ path }) => path));

const redirects = new Map<string, string>([
  ["/paint", "/products"],
  ["/waterproof-paint", "/products"],
  ["/decorative-paint", "/products"],
  ["/composite-wood", "/products"],
  ["/doors", "/products"],
  ["/windows", "/products"],
  ["/rainbark", "/brands/rainbark"],
  ["/products/brand/oriental-yuhong", "/brands/oriental-yuhong"],
  ["/products/brand/conch", "/brands/conch"],
  ["/products/brand/rainbark", "/brands/rainbark"],
  ["/zh/paint", "/zh/products"],
  ["/zh/waterproof-paint", "/zh/products"],
  ["/zh/decorative-paint", "/zh/products"],
  ["/zh/composite-wood", "/zh/products"],
  ["/zh/doors", "/zh/products"],
  ["/zh/windows", "/zh/products"],
  ["/zh/rainbark", "/zh/brands/rainbark"],
  ["/zh/products/brand/oriental-yuhong", "/zh/brands/oriental-yuhong"],
  ["/zh/products/brand/conch", "/zh/brands/conch"],
  ["/zh/products/brand/rainbark", "/zh/brands/rainbark"],
]);

const normalizePath = (pathname: string): string => {
  const normalized = pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return normalized || "/";
};

const createAssetRequest = (request: Request, pathname: string): Request => {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
};

export default {
  fetch: async (request: Request, env: Env): Promise<Response> => {
    const url = new URL(request.url);
    const pathname = normalizePath(url.pathname);

    if (pathname !== url.pathname) {
      url.pathname = pathname;
      return Response.redirect(url.toString(), 308);
    }

    const rainbarkInfo = pathname.match(/^\/(zh\/)?rainbark\/info\/[^/]+$/);
    if (rainbarkInfo) {
      url.pathname = rainbarkInfo[1] ? "/zh/brands/rainbark" : "/brands/rainbark";
      return Response.redirect(url.toString(), 308);
    }

    const redirect = redirects.get(pathname);
    if (redirect) {
      url.pathname = redirect;
      return Response.redirect(url.toString(), 308);
    }

    if (knownPaths.has(pathname)) {
      const assetPath = pathname === "/" ? "/index.html" : `${pathname}.html`;
      return env.ASSETS.fetch(createAssetRequest(request, assetPath));
    }

    if (pathname.includes(".")) return env.ASSETS.fetch(request);

    const response = await env.ASSETS.fetch(createAssetRequest(request, "/index.html"));
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      headers,
      status: 404,
      statusText: "Not Found",
    });
  },
} satisfies ExportedHandler<Env>;
