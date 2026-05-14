import { beforeEach, describe, expect, it } from "vitest";

import { Atlas } from "../../../src/atlas/Atlas";
import { Resource } from "../../../src/resources/Resource";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";
  static override labels = {
    plural: "Products",
    singular: "Product"
  };
  static override pages = {
    create: "/products/create",
    detail: "/products/:id",
    edit: "/products/:id/edit",
    index: "/products"
  };
  static override searchable = ["name", "sku"];
  static override endpoints = {
    collection: "/inventory/products",
    item: "/inventory/products/:id"
  };
  static override pagination = "paginate";
}

describe("resource metadata", () => {
  beforeEach(() => {
    Atlas.reset();
  });

  it("resolves resource metadata from the registered resource", () => {
    const runtime = Atlas.configure({
      resources: [ProductResource]
    });

    const metadata = runtime.resourceRegistry.metadataFor("products");

    expect(metadata).toMatchObject({
      endpoints: {
        collection: "/inventory/products",
        item: "/inventory/products/:id"
      },
      labels: {
        plural: "Products",
        singular: "Product"
      },
      pages: {
        create: "/products/create",
        detail: "/products/:id",
        edit: "/products/:id/edit",
        index: "/products"
      },
      pagination: "paginate",
      searchable: ["name", "sku"],
      uriKey: "products"
    });
  });
});
