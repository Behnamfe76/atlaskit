import type { NormalizedRule } from "./ruleTypes";

function createRule(
  name: string,
  parameters: readonly unknown[] = []
): NormalizedRule {
  return {
    name,
    parameters
  };
}

export class Rule {
  static custom(
    name: string,
    ...parameters: readonly unknown[]
  ): NormalizedRule {
    return createRule(name, parameters);
  }

  static max(value: number): NormalizedRule {
    return createRule("max", [value]);
  }

  static min(value: number): NormalizedRule {
    return createRule("min", [value]);
  }

  static required(): NormalizedRule {
    return createRule("required");
  }

  static string(): NormalizedRule {
    return createRule("string");
  }
}
