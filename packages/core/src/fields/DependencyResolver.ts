import type { Field } from "./Field";
import type { FieldDependencyValues } from "./fieldTypes";

export class DependencyResolver {
  static resolve<TField extends Field>(
    fields: readonly TField[],
    values: FieldDependencyValues
  ): readonly TField[] {
    return fields.map((field) => {
      const resolved = field.clone();

      for (const dependency of resolved.dependencies) {
        void dependency.callback(resolved, values);
      }

      return resolved;
    });
  }
}
