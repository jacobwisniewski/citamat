import { describe, expect, it } from "vitest";
import { brands, products, t } from "./site";

describe("GIVEN the static catalogue WHEN data is loaded SHOULD remain internally consistent", () => {
  it("references a known brand from every product", () => {
    const brandSlugs = new Set(brands.map((brand) => brand.slug));
    expect(products.every((product) => brandSlugs.has(product.brand))).toBe(true);
  });

  it("contains unique product slugs", () => {
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
  });

  it("returns the selected locale", () => {
    expect(t({ en: "Waterproofing", zh: "防水" }, "zh")).toMatchInlineSnapshot(`"防水"`);
  });
});
