import { describe, expect, it } from "vitest";
import { buildStructuredData, getSeoEntry, seoRoutes } from "../config";

describe("SEO configuration", () => {
  it("GIVEN all indexable routes WHEN checking paths SHOULD be unique and reciprocal", () => {
    const paths = seoRoutes.map(({ path }) => path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(
      seoRoutes.every((entry) => {
        const alternate = seoRoutes.find(({ path }) => path === entry.alternatePath);
        return alternate?.alternatePath === entry.path && alternate.locale !== entry.locale;
      }),
    ).toBe(true);
  });

  it("GIVEN the site root WHEN resolving SEO SHOULD default to English", () => {
    expect(getSeoEntry("/")).toMatchObject({
      locale: "en",
      path: "/",
      alternatePath: "/zh",
      indexable: true,
    });
  });

  it("GIVEN an unknown route WHEN resolving SEO SHOULD prevent indexing", () => {
    expect(getSeoEntry("/missing-page")).toMatchObject({
      locale: "en",
      indexable: false,
    });
  });

  it("GIVEN a product route WHEN building schema SHOULD include Product and breadcrumbs", () => {
    const schema = buildStructuredData(getSeoEntry("/products/yhcoat-1300"));

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@graph": expect.arrayContaining([
        expect.objectContaining({ "@type": "Product", name: "YHCoat 1300" }),
        expect.objectContaining({ "@type": "BreadcrumbList" }),
      ]),
    });
  });

  it("GIVEN the contact route WHEN building schema SHOULD include warehouse hours", () => {
    const schema = buildStructuredData(getSeoEntry("/contact"));

    expect(schema).toMatchObject({
      "@graph": expect.arrayContaining([
        expect.objectContaining({
          "@type": ["Organization", "LocalBusiness"],
          openingHoursSpecification: expect.arrayContaining([
            expect.objectContaining({ opens: "08:30", closes: "17:30" }),
          ]),
        }),
      ]),
    });
  });
});
