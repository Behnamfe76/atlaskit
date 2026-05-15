import { describe, expect, it } from "vitest";

import {
  normalizeClassValue,
  renderAuthorization,
  resolveResourceReference
} from "../src";

class ProductResourceClass {
  static id = "products";
  static uriKey = "products";
}

describe("adapter contracts", () => {
  it("normalizes class values", () => {
    expect(
      normalizeClassValue("rounded", ["border", "px-4"], undefined, false, "py-2")
    ).toBe("rounded border px-4 py-2");
  });

  it("resolves resource references from uriKey, class, and instance forms", () => {
    const resolver = {
      byUriKey(uriKey: string) {
        expect(uriKey).toBe("products");
        return ProductResourceClass;
      }
    };

    expect(resolveResourceReference("products", resolver)).toMatchObject({
      identifier: "products",
      kind: "uriKey",
      resourceClass: ProductResourceClass
    });
    expect(resolveResourceReference(ProductResourceClass, resolver)).toMatchObject({
      identifier: "products",
      kind: "class",
      resourceClass: ProductResourceClass
    });
    expect(
      resolveResourceReference(new (ProductResourceClass as unknown as new () => object)(), resolver)
    ).toMatchObject({
      identifier: "products",
      kind: "instance",
      resourceClass: ProductResourceClass
    });
  });

  it("maps visibility and executability to render states", () => {
    expect(renderAuthorization({ executable: true, visible: true })).toBe("active");
    expect(renderAuthorization({ executable: false, visible: true })).toBe(
      "disabled"
    );
    expect(renderAuthorization({ executable: false, visible: false })).toBe(
      "hidden"
    );
  });
});
