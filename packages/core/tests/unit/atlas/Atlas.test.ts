import { beforeEach, describe, expect, it } from "vitest";

import { Atlas } from "../../../src/atlas/Atlas";
import { DuplicateRegistrationError } from "../../../src/support/errors";
import { Resource } from "../../../src/resources/Resource";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";
  static override labels = {
    plural: "Products",
    singular: "Product"
  };
}

class DuplicateProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products-duplicate";
}

describe("Atlas", () => {
  beforeEach(() => {
    Atlas.reset();
  });

  it("configures a runtime once and resolves the resource registry", () => {
    const runtime = Atlas.configure({
      resources: [ProductResource]
    });

    expect(runtime.resourceRegistry.getById("products")).toBe(ProductResource);
    expect(Atlas.runtime()).toBe(runtime);
  });

  it("throws when duplicate resource identifiers are registered", () => {
    expect(() =>
      Atlas.configure({
        resources: [ProductResource, DuplicateProductResource]
      })
    ).toThrowError(DuplicateRegistrationError);
  });
});
