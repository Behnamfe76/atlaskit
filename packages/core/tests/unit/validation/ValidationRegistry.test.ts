import { describe, expect, it } from "vitest";

import {
  Rule,
  ValidationRegistry,
  parseRules,
  validateFieldValue
} from "../../../src";

describe("ValidationRegistry", () => {
  it("registers custom validators and executes them", () => {
    const registry = new ValidationRegistry();
    registry.registerRule("even", (value) => Number(value) % 2 === 0);

    expect(
      validateFieldValue(4, parseRules([Rule.custom("even")]), registry)
    ).toEqual([]);

    expect(
      validateFieldValue(3, parseRules([Rule.custom("even")]), registry)
    ).toEqual(["even"]);
  });
});
