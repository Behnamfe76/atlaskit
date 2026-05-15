import { describe, expect, it } from "vitest";

import { Rule, parseRules } from "../../../src";

describe("RuleParser", () => {
  it("normalizes string and typed rules into a common shape", () => {
    const rules = parseRules(["required|string|max:255", Rule.min(3)]);

    expect(rules).toEqual([
      { name: "required", parameters: [] },
      { name: "string", parameters: [] },
      { name: "max", parameters: ["255"] },
      { name: "min", parameters: [3] }
    ]);
  });
});
