import { describe, expect, it } from "vitest";

import { behaviorScenarios, vueReferenceScenarios } from "../src";

describe("action execution contract", () => {
  it("preserves the action execution scenario set", () => {
    expect(vueReferenceScenarios.actionExecution).toEqual(
      behaviorScenarios.actionExecution
    );
    expect(vueReferenceScenarios.actionExecution).toContain("bulk-selection");
    expect(vueReferenceScenarios.actionExecution).toContain("result-state");
  });
});
