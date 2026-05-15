import { describe, expect, it } from "vitest";

import { resolveResourceReference } from "../../adapter-contracts/src";
import { behaviorScenarios } from "../src";

class ProductResource {
  static id = "products";
  static uriKey = "products";
}

describe("resource resolution contract", () => {
  it("covers uriKey, class, and instance resource inputs", () => {
    const resolver = {
      byUriKey(uriKey: string) {
        expect(uriKey).toBe("products");
        return ProductResource;
      }
    };

    expect(behaviorScenarios.resourceResolution).toEqual([
      "uriKey",
      "class",
      "instance"
    ]);
    expect(resolveResourceReference("products", resolver).kind).toBe("uriKey");
    expect(resolveResourceReference(ProductResource, resolver).kind).toBe(
      "class"
    );
    expect(
      resolveResourceReference(
        new (ProductResource as unknown as new () => object)(),
        resolver
      ).kind
    ).toBe("instance");
  });
});
