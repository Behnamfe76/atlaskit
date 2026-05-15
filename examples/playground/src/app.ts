import { h } from "vue";

import {
  AtlasActionRunner,
  AtlasResourceForm,
  AtlasResourceShow,
  AtlasResourceTable,
  createClassMap
} from "@atlaskit/vue";

const classMap = createClassMap({
  actionRunner: {
    root: "justify-end"
  },
  resourceForm: {
    root: "border-slate-300"
  },
  resourceTable: {
    root: "ring-1 ring-slate-200",
    toolbar: "justify-between"
  }
});

const theme = {
  color: {
    accent: "text-emerald-600",
    strong: "text-slate-950"
  },
  surface: {
    subtle: "bg-slate-100"
  }
} as const;

export function renderApp() {
  return h("main", { class: "mx-auto max-w-6xl space-y-8 p-6" }, [
    h("header", { class: "space-y-2" }, [
      h(
        "h1",
        { class: "text-2xl font-semibold text-slate-950" },
        "AtlasKit Playground"
      ),
      h(
        "p",
        { class: "text-sm text-slate-600" },
        "Reference Vue adapter wiring for table, form, show, field, and action surfaces."
      )
    ]),
    h("section", { class: "space-y-4" }, [
      h(
        "h2",
        { class: "text-sm font-semibold uppercase text-slate-500" },
        "Table"
      ),
      h(AtlasResourceTable, {
        classMap,
        resource: "products",
        theme
      })
    ]),
    h("section", { class: "grid gap-6 lg:grid-cols-2" }, [
      h("div", { class: "space-y-4" }, [
        h(
          "h2",
          { class: "text-sm font-semibold uppercase text-slate-500" },
          "Create Form"
        ),
        h(AtlasResourceForm, {
          classMap,
          initialValues: {
            category: "books",
            tags: ["alpha"]
          },
          mode: "create",
          resource: "products",
          theme
        })
      ]),
      h("div", { class: "space-y-4" }, [
        h(
          "h2",
          { class: "text-sm font-semibold uppercase text-slate-500" },
          "Show"
        ),
        h(AtlasResourceShow, {
          classMap,
          resource: "products",
          resourceId: 1,
          theme
        })
      ])
    ]),
    h("section", { class: "space-y-4" }, [
      h(
        "h2",
        { class: "text-sm font-semibold uppercase text-slate-500" },
        "Action Runner"
      ),
      h(AtlasActionRunner, {
        actions: [
          {
            async execute(context: Record<string, unknown>) {
              return context.selection ?? [];
            },
            label: "Run Bulk Action"
          }
        ],
        classMap,
        resource: "products",
        selection: [{ id: 1 }, { id: 2 }],
        theme
      })
    ])
  ]);
}
