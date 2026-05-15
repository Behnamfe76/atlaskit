import { describe, expect, it } from "vitest";

import {
  Atlas,
  Plugin,
  PluginRegistry,
  Rule,
  ValidationRegistry,
  parseRules,
  validateFieldValue
} from "../../../src";

class EvenRulePlugin extends Plugin {
  readonly name = "even-rule";
  readonly version = "1.0.0";

  override register(context: { validationRegistry: ValidationRegistry }) {
    context.validationRegistry.registerRule(
      "even",
      (value) => Number(value) % 2 === 0
    );
  }
}

describe("PluginRegistry", () => {
  it("registers core plugins and exposes their capabilities", () => {
    const runtime = Atlas.configure({
      plugins: [new EvenRulePlugin()]
    });

    expect(runtime.pluginRegistry).toBeInstanceOf(PluginRegistry);
    expect(
      validateFieldValue(
        2,
        parseRules([Rule.custom("even")]),
        runtime.validationRegistry
      )
    ).toEqual([]);
  });
});
