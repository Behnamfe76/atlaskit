import type { Field } from "./Field";
import type { FieldPage } from "./fieldTypes";

export function resolveFieldsForPage<TField extends Field>(
  fields: readonly TField[],
  page: FieldPage
): readonly TField[] {
  return fields.filter((field) => field.isVisibleOn(page));
}
