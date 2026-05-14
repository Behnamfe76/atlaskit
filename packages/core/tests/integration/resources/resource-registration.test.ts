import { beforeEach, describe, expect, it } from "vitest";

import { Atlas } from "../../../src/atlas/Atlas";
import { DuplicateRegistrationError } from "../../../src/support/errors";
import { Resource } from "../../../src/resources/Resource";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";
}

class DuplicateUriResource extends Resource {
  static override id = "inventory";
  static override uriKey = "products";
}

describe("resource registration", () => {
  beforeEach(() => {
    Atlas.reset();
  });

  it("registers resources at startup", () => {
    const runtime = Atlas.configure({
      resources: [ProductResource]
    });

    expect(runtime.resourceRegistry.all()).toHaveLength(1);
    expect(runtime.resourceRegistry.getById("products")).toBe(ProductResource);
  });

  it("rejects duplicate uri keys", () => {
    expect(() =>
      Atlas.configure({
        resources: [ProductResource, DuplicateUriResource]
      })
    ).toThrowError(DuplicateRegistrationError);
  });
});
