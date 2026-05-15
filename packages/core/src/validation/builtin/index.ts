import type { Validator } from "../ruleTypes";

function asLength(value: unknown): number {
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length;
  }

  if (typeof value === "number") {
    return value;
  }

  return 0;
}

export const builtinValidators: Record<string, Validator> = {
  max: (value, [max]) => asLength(value) <= Number(max),
  min: (value, [min]) => asLength(value) >= Number(min),
  required: (value) =>
    value !== undefined &&
    value !== null &&
    (!(typeof value === "string") || value.trim().length > 0),
  string: (value) => typeof value === "string"
};
