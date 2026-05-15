import {
  Atlas,
  BelongsTo,
  BelongsToMany,
  Resource,
  Select,
  Text
} from "@atlaskit/core";

export class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";

  override fields() {
    return [
      Text.make("Name", "name").rulesFor("required"),
      Text.make("Slug", "slug").dependsOn("name", async (field, values) => {
        await Promise.resolve();

        if (String(values.name ?? "").trim().length === 0) {
          field.hideOnCreate();
          field.hideOnEdit();
          return;
        }

        field.showOnCreate();
        field.showOnEdit();
      }),
      Select.make("Status", "status").options({
        archived: "Archived",
        draft: "Draft",
        published: "Published"
      }),
      BelongsTo.make("Category", "category").display({
        options: {
          books: "Books",
          shoes: "Shoes"
        }
      }),
      BelongsToMany.make("Tags", "tags").display({
        options: {
          alpha: "Alpha",
          beta: "Beta"
        }
      })
    ];
  }
}

export function configureFixtureAtlas() {
  Atlas.reset();
  return Atlas.configure({
    resources: [ProductResource]
  });
}
