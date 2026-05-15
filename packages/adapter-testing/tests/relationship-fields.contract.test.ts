import { describe, expect, it } from "vitest";

import { behaviorScenarios, vueReferenceScenarios } from "../src";

describe("relationship fields contract", () => {
  it("records belongsTo and belongsToMany parity expectations", () => {
    expect(vueReferenceScenarios.relationshipFields).toEqual(
      behaviorScenarios.relationshipFields
    );
    expect(vueReferenceScenarios.relationshipFields).toEqual([
      "belongsTo",
      "belongsToMany"
    ]);
  });
});
