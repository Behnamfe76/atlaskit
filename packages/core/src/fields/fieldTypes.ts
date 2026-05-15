import type { PlainObject } from "../support/types";
import type { NormalizedRule, RuleInput } from "../validation/ruleTypes";
import type { Field } from "./Field";

export type FieldPage = "index" | "detail" | "create" | "edit";

export interface FieldVisibility {
  readonly create: boolean;
  readonly detail: boolean;
  readonly edit: boolean;
  readonly index: boolean;
}

export type FieldDependencyValues = PlainObject;

export interface FieldDependency<FieldInstance> {
  readonly attribute: string;
  readonly callback: (
    field: FieldInstance,
    values: FieldDependencyValues
  ) => void | Promise<void>;
}

export interface FieldDefinition {
  readonly attribute: string;
  readonly defaultValue?: unknown;
  readonly dependencies: readonly FieldDependency<Field>[];
  readonly displayMeta: PlainObject;
  readonly filterable: boolean;
  readonly helpText?: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly rules: readonly NormalizedRule[];
  readonly searchable: boolean;
  readonly serializationMeta: PlainObject;
  readonly sortable: boolean;
  readonly type: string;
  readonly visibility: FieldVisibility;
}

export interface FieldCapabilityDefinition {
  readonly allowsDependencies: boolean;
  readonly allowsOptions: boolean;
  readonly allowsValidation: boolean;
}

export interface FieldFactory<TField> {
  make(label: string, attribute?: string): TField;
}

export interface RuleAwareField {
  rules(ruleInput: readonly RuleInput[] | RuleInput): this;
}
