import { computed, defineComponent, h, type PropType } from "vue";

import type { Field } from "@atlaskit/core";

import type {
  ResourceTableCellSlotProps,
  ResourceTableRowSlotProps,
  ResourceTableSlotProps
} from "../contracts/slotProps";
import type { ResourceTableProps } from "../contracts/componentProps";
import { useAtlasTheme } from "../composables/useAtlasTheme";
import { useResourceTable } from "../composables/useResourceTable";
import { classNameFor, themeTokenFor } from "../theme/runtime";
import { AtlasActionRunner } from "./AtlasActionRunner";
import { AtlasFieldRenderer } from "./AtlasFieldRenderer";

function tableRowValue(row: unknown, attribute: string): unknown {
  if (typeof row !== "object" || row === null) {
    return undefined;
  }

  return (row as Record<string, unknown>)[attribute];
}

export const AtlasResourceTable = defineComponent({
  name: "AtlasResourceTable",
  props: {
    classMap: {
      default: undefined,
      type: Object as PropType<ResourceTableProps["classMap"]>
    },
    queryOptions: {
      default: undefined,
      type: Object as PropType<ResourceTableProps["queryOptions"]>
    },
    resource: {
      required: true,
      type: [String, Object, Function] as PropType<
        ResourceTableProps["resource"]
      >
    },
    state: {
      default: undefined,
      type: Object as PropType<ResourceTableProps["state"]>
    },
    theme: {
      default: undefined,
      type: Object as PropType<ResourceTableProps["theme"]>
    }
  },
  setup(props, { slots }) {
    const table = useResourceTable(() => props);
    const theme = computed(() =>
      useAtlasTheme({
        classMap: props.classMap,
        theme: props.theme
      })
    );
    const visibleFields = computed(() =>
      table.fields.value.filter((field) =>
        (field as Field).isVisibleOn("index")
      )
    );

    return () => {
      const themeContext = theme.value;
      const slotProps: ResourceTableSlotProps = {
        classMap: themeContext.classMap,
        fields: visibleFields.value as Field[],
        rows: table.rows.value,
        state: table.state.value,
        theme: themeContext.theme
      };

      const defaultContent = slots.default?.(slotProps);

      if (defaultContent) {
        return h(
          "section",
          {
            class: classNameFor(
              themeContext.classMap,
              ["resourceTable", "root"],
              themeTokenFor(themeContext.theme, ["surface", "card"]),
              themeTokenFor(themeContext.theme, ["border", "muted"])
            )
          },
          defaultContent
        );
      }

      return h(
        "section",
        {
          class: classNameFor(
            themeContext.classMap,
            ["resourceTable", "root"],
            themeTokenFor(themeContext.theme, ["surface", "card"]),
            themeTokenFor(themeContext.theme, ["border", "muted"])
          ),
          "data-testid": "resource-table"
        },
        [
          h(
            "div",
            {
              class: classNameFor(themeContext.classMap, [
                "resourceTable",
                "toolbar"
              ])
            },
            [
              slots.toolbar?.(slotProps) ??
                h("input", {
                  class: classNameFor(
                    themeContext.classMap,
                    ["resourceTable", "search"],
                    themeTokenFor(themeContext.theme, ["surface", "subtle"]),
                    themeTokenFor(themeContext.theme, ["color", "strong"])
                  ),
                  "data-testid": "resource-table-search",
                  onInput: (event: Event) =>
                    table.setSearch((event.target as HTMLInputElement).value),
                  placeholder: "Search",
                  value: table.search.value
                }),
              table.actions.value.length > 0
                ? (slots.actions?.(slotProps) ??
                  h(AtlasActionRunner, {
                    actions: table.actions.value,
                    classMap: themeContext.classMap,
                    resource: props.resource,
                    selection: table.selectedRows.value,
                    theme: themeContext.theme
                  }))
                : null
            ]
          ),
          table.loading.value
            ? (slots.loading?.(slotProps) ?? h("div", "Loading..."))
            : null,
          !table.loading.value && table.rows.value.length === 0
            ? (slots.empty?.(slotProps) ??
              h(
                "div",
                {
                  class: classNameFor(themeContext.classMap, [
                    "resourceTable",
                    "empty"
                  ])
                },
                "No records"
              ))
            : null,
          table.rows.value.length > 0
            ? h(
                "table",
                {
                  class: classNameFor(themeContext.classMap, [
                    "resourceTable",
                    "table"
                  ])
                },
                [
                  h("thead", [
                    h(
                      "tr",
                      visibleFields.value.map((field) =>
                        h(
                          "th",
                          {
                            class: classNameFor(
                              themeContext.classMap,
                              ["resourceTable", "header"],
                              themeTokenFor(themeContext.theme, [
                                "color",
                                "muted"
                              ])
                            ),
                            scope: "col"
                          },
                          field.label
                        )
                      )
                    )
                  ]),
                  h(
                    "tbody",
                    table.rows.value.map((row, rowIndex) => {
                      const rowSlotProps: ResourceTableRowSlotProps = {
                        fields: visibleFields.value as Field[],
                        row,
                        rowIndex,
                        state: table.state.value
                      };
                      const customRow = slots.row?.(rowSlotProps);

                      if (customRow) {
                        return h(
                          "tr",
                          {
                            class: classNameFor(themeContext.classMap, [
                              "resourceTable",
                              "row"
                            ])
                          },
                          customRow
                        );
                      }

                      return h(
                        "tr",
                        {
                          class: classNameFor(themeContext.classMap, [
                            "resourceTable",
                            "row"
                          ])
                        },
                        visibleFields.value.map((field) => {
                          const value = tableRowValue(row, field.attribute);
                          const cellSlotProps: ResourceTableCellSlotProps = {
                            field,
                            row,
                            rowIndex,
                            state: table.state.value,
                            value
                          };

                          return h(
                            "td",
                            {
                              class: classNameFor(themeContext.classMap, [
                                "resourceTable",
                                "cell"
                              ])
                            },
                            slots.cell?.(cellSlotProps) ?? [
                              h(AtlasFieldRenderer, {
                                classMap: themeContext.classMap,
                                field,
                                mode: "index",
                                theme: themeContext.theme,
                                value
                              })
                            ]
                          );
                        })
                      );
                    })
                  )
                ]
              )
            : null
        ]
      );
    };
  }
});
