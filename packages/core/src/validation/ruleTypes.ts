export interface NormalizedRule {
  readonly name: string;
  readonly parameters: readonly unknown[];
}

export type RuleInput = string | NormalizedRule;

export type Validator = (
  value: unknown,
  parameters: readonly unknown[]
) => boolean;
