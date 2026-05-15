import { describe, expect, it } from "vitest";

import {
  behaviorScenarios,
  futureAdapterBlueprints,
  vueReferenceScenarios
} from "../src";

describe("styling customization contract", () => {
  it("tracks styling scenarios for the Vue reference adapter", () => {
    expect(vueReferenceScenarios.styling).toEqual(behaviorScenarios.styling);
    expect(vueReferenceScenarios.styling).toContain("class-map-overrides");
    expect(vueReferenceScenarios.styling).toContain("theme-token-overrides");
  });

  it("keeps future adapters pointed at the same reference contract", () => {
    expect(
      futureAdapterBlueprints.every(
        (blueprint) =>
          blueprint.contract === "shared-adapter-behavior" &&
          blueprint.referenceAdapter === "@atlaskit/vue"
      )
    ).toBe(true);
  });
});
