import type { ValidationRegistry } from "../registries/ValidationRegistry";

import type { NormalizedRule } from "./ruleTypes";

export function validateFieldValue(
  value: unknown,
  rules: readonly NormalizedRule[],
  registry: ValidationRegistry
): readonly string[] {
  const failures: string[] = [];

  for (const rule of rules) {
    const validator = registry.get(rule.name);
    if (!validator(value, rule.parameters)) {
      failures.push(rule.name);
    }
  }

  return failures;
}
