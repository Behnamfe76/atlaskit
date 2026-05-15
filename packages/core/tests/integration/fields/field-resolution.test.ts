import { describe, expect, it } from "vitest";

import { ID, Resource, Text, resolveFieldsForPage } from "../../../src";

class FieldResolutionResource extends Resource {
  static override id = "field-resolution";
  static override uriKey = "field-resolution";

  override fields() {
    return [
      ID.make("ID", "id").showOnIndex(),
      Text.make("Name", "name").hideOnIndex(),
      Text.make("Status", "status").showOnIndex().showOnDetail()
    ];
  }
}

describe("field resolution", () => {
  it("filters fields by page visibility", () => {
    const resource = new FieldResolutionResource();

    const indexFields = resolveFieldsForPage(resource.fields(), "index");
    const detailFields = resolveFieldsForPage(resource.fields(), "detail");

    expect(indexFields.map((field) => field.attribute)).toEqual([
      "id",
      "status"
    ]);
    expect(detailFields.map((field) => field.attribute)).toEqual([
      "id",
      "name",
      "status"
    ]);
  });
});
