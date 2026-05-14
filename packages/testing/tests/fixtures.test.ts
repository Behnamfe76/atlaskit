import { describe, expect, it } from "vitest";

import {
  createFixtureRegistry,
  createFixtureResource
} from "../src/fixtures/resourceFixtures";

describe("@atlaskit/testing fixtures", () => {
  it("creates a sample resource fixture", () => {
    const ResourceFixture = createFixtureResource("Product");

    expect(ResourceFixture.id).toBe("product");
    expect(ResourceFixture.uriKey).toBe("products");
  });

  it("creates a registry fixture with the provided label", () => {
    expect(createFixtureRegistry("resources")).toEqual({
      entries: [],
      label: "resources"
    });
  });
});
