import { afterEach, describe, expect, it } from "vitest";

import { Atlas } from "@atlaskit/core";

import { useAtlasResource } from "../../src/composables/useAtlasResource";
import {
  ProductResource,
  configureFixtureAtlas
} from "../helpers/fixtureResource";

describe("useAtlasResource", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("resolves resource metadata from a uriKey", () => {
    configureFixtureAtlas();

    const resource = useAtlasResource("products");

    expect(resource.metadata.value.uriKey).toBe("products");
    expect(resource.resourceClass.value).toBe(ProductResource);
    expect(resource.fields.value.map((field) => field.attribute)).toContain(
      "name"
    );
  });
});
