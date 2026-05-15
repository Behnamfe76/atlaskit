import type { Field } from "./Field";
import type { FieldCapabilityDefinition, FieldFactory } from "./fieldTypes";

export interface FieldTypeDefinition<TField extends Field = Field> {
  readonly capabilities: FieldCapabilityDefinition;
  readonly className: string;
  readonly factory: FieldFactory<TField>;
  readonly key: string;
  readonly pluginSource: "builtin" | "plugin";
}
