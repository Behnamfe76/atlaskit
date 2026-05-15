import { describe, expect, it } from "vitest";

import { futureAdapterBlueprints, vueReferenceAdapter } from "../src";

describe("future adapter parity contract", () => {
  it("requires future adapters to match the Vue public surface blueprint", () => {
    for (const blueprint of futureAdapterBlueprints) {
      expect(blueprint.requiredComponents).toEqual(
        vueReferenceAdapter.requiredComponents
      );
      expect(blueprint.requiredComposables).toEqual(
        vueReferenceAdapter.requiredComposables
      );
    }
  });
});
