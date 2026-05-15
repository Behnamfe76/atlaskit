import type { NormalizedRule, RuleInput } from "./ruleTypes";

function normalizeStringRule(rule: string): readonly NormalizedRule[] {
  return rule
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [name, serializedParameters] = segment.split(":");
      return {
        name,
        parameters: serializedParameters
          ? serializedParameters.split(",").map((value) => value.trim())
          : []
      };
    });
}

export function parseRules(
  ruleInput: readonly RuleInput[] | RuleInput
): readonly NormalizedRule[] {
  const values = Array.isArray(ruleInput) ? ruleInput : [ruleInput];
  return values.flatMap((value) =>
    typeof value === "string" ? normalizeStringRule(value) : [value]
  );
}
