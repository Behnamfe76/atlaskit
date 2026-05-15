import {
  Atlas,
  BelongsTo,
  BelongsToMany,
  Plugin,
  Resource,
  Select,
  Text,
  type ValidationRegistry
} from "../../../packages/core/src";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";

  override fields() {
    return [
      Text.make("Name", "name").rulesFor("nonEmpty"),
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
      Select.make("Status", "status").default("draft").options({
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
          beta: "Beta",
          gamma: "Gamma"
        }
      })
    ];
  }

  override actions() {
    return [
      {
        async execute(context: Record<string, unknown>) {
          return {
            executed: true,
            selectionSize: Array.isArray(context.selection)
              ? context.selection.length
              : 0
          };
        },
        label: "Sync Products"
      }
    ];
  }
}

class PlaygroundPlugin extends Plugin {
  readonly name = "playground-plugin";
  readonly version = "1.0.0";

  override register(context: { validationRegistry: ValidationRegistry }) {
    context.validationRegistry.registerRule(
      "nonEmpty",
      (value) => String(value ?? "").trim().length > 0
    );
  }
}

export function bootstrapPlayground() {
  Atlas.reset();
  const runtime = Atlas.configure({
    plugins: [new PlaygroundPlugin()],
    resources: [ProductResource]
  });

  runtime.queryClient.setQueryData(
    [
      "atlas",
      "products",
      "table",
      { filters: {}, page: 1, perPage: 15, search: "", sort: null },
      {}
    ],
    {
      data: [
        {
          category: { label: "Shoes" },
          id: 1,
          name: "Trail Runner",
          slug: "trail-runner",
          status: "published",
          tags: [{ label: "Alpha" }, { name: "Gamma" }]
        },
        {
          category: { label: "Books" },
          id: 2,
          name: "Field Guide",
          slug: "field-guide",
          status: "draft",
          tags: [{ label: "Beta" }]
        }
      ]
    }
  );

  runtime.queryClient.setQueryData(["atlas", "products", "show", 1], {
    category: { label: "Shoes" },
    id: 1,
    name: "Trail Runner",
    slug: "trail-runner",
    status: "published",
    tags: [{ label: "Alpha" }, { name: "Gamma" }]
  });

  return runtime;
}
