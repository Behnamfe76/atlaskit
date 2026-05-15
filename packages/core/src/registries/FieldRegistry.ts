import { BaseRegistry } from "./BaseRegistry";

import type { Field } from "../fields/Field";
import type { FieldTypeDefinition } from "../fields/fieldRegistryTypes";

export class FieldRegistry extends BaseRegistry<string, FieldTypeDefinition> {
  register<TField extends Field>(
    definition: FieldTypeDefinition<TField>
  ): this {
    this.registerEntry(definition.key, definition);
    return this;
  }
}
