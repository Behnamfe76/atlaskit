import { describe, expect, it } from "vitest";

import { behaviorScenarios, vueReferenceScenarios } from "../src";

describe("async dependencies contract", () => {
  it("preserves the async dependency scenario set", () => {
    expect(vueReferenceScenarios.asyncDependencies).toEqual(
      behaviorScenarios.asyncDependencies
    );
    expect(vueReferenceScenarios.asyncDependencies).toContain(
      "hidden-until-ready"
    );
    expect(vueReferenceScenarios.asyncDependencies).toContain(
      "visible-after-update"
    );
  });
});
