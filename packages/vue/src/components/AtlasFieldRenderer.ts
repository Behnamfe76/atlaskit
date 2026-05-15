import { defineComponent, h, type PropType, type VNode } from "vue";

import type { Field } from "@atlaskit/core";

import type { FieldRendererProps } from "../contracts/componentProps";
import type { FieldRendererSlotProps } from "../contracts/slotProps";
import { useAtlasTheme } from "../composables/useAtlasTheme";
import { useFieldRenderer } from "../composables/useFieldRenderer";
import { classNameFor, themeTokenFor } from "../theme/runtime";

function renderOptions(
  options: Record<string, string>,
  currentValue: unknown,
  multiple = false
): VNode[] {
  const selectedValues =
    multiple && Array.isArray(currentValue)
      ? new Set(currentValue.map((value) => String(value)))
      : new Set([String(currentValue ?? "")]);

  return Object.entries(options).map(([value, label]) =>
    h(
      "option",
      {
        selected: selectedValues.has(value),
        value
      },
      label
    )
  );
}

function normalizeMultipleValue(target: HTMLSelectElement): string[] {
  return Array.from(target.selectedOptions).map((option) => option.value);
}

export const AtlasFieldRenderer = defineComponent({
  name: "AtlasFieldRenderer",
  props: {
    classMap: {
      default: undefined,
      type: Object as PropType<FieldRendererProps["classMap"]>
    },
    errors: {
      default: undefined,
      type: Array as PropType<FieldRendererProps["errors"]>
    },
    field: {
      required: true,
      type: Object as PropType<Field>
    },
    mode: {
      required: true,
      type: String as PropType<FieldRendererProps["mode"]>
    },
    state: {
      default: undefined,
      type: Object as PropType<FieldRendererProps["state"]>
    },
    theme: {
      default: undefined,
      type: Object as PropType<FieldRendererProps["theme"]>
    },
    value: {
      default: undefined,
      type: null as unknown as PropType<FieldRendererProps["value"]>
    }
  },
  emits: {
    "update:value": (_value: unknown) => true
  },
  setup(props, { emit, slots }) {
    const renderer = useFieldRenderer(() => props);
    const theme = useAtlasTheme({
      classMap: props.classMap,
      theme: props.theme
    });

    function updateValue(event: Event): void {
      const target = event.target;

      if (
        !(
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        )
      ) {
        return;
      }

      if (renderer.fieldType.value === "belongsToMany") {
        emit(
          "update:value",
          normalizeMultipleValue(target as HTMLSelectElement)
        );
        return;
      }

      emit("update:value", target.value);
    }

    function renderDefaultField(): VNode {
      if (!renderer.isFormMode.value) {
        if (renderer.fieldType.value === "belongsToMany") {
          return h(
            "ul",
            {
              class: classNameFor(theme.classMap, ["fieldRenderer", "list"]),
              "data-testid": "field-list"
            },
            renderer.collectionValue.value.map((item) =>
              h(
                "li",
                {
                  class: "rounded bg-slate-100 px-2 py-1 text-sm text-slate-700"
                },
                item
              )
            )
          );
        }

        return h(
          "span",
          {
            class: classNameFor(
              theme.classMap,
              ["fieldRenderer", "text"],
              themeTokenFor(theme.theme, ["color", "strong"])
            ),
            "data-testid": "field-text"
          },
          renderer.displayValue.value
        );
      }

      if (renderer.fieldType.value === "textarea") {
        return h("textarea", {
          class: classNameFor(
            theme.classMap,
            ["fieldRenderer", "textarea"],
            themeTokenFor(theme.theme, ["border", "muted"]),
            themeTokenFor(theme.theme, ["color", "strong"])
          ),
          disabled: renderer.disabled.value,
          placeholder: renderer.placeholder.value,
          value: String(renderer.rawValue.value ?? ""),
          onInput: updateValue
        });
      }

      if (
        renderer.fieldType.value === "select" ||
        renderer.fieldType.value === "belongsTo" ||
        renderer.fieldType.value === "belongsToMany"
      ) {
        return h(
          "select",
          {
            class: classNameFor(
              theme.classMap,
              ["fieldRenderer", "select"],
              themeTokenFor(theme.theme, ["border", "muted"]),
              themeTokenFor(theme.theme, ["surface", "card"]),
              themeTokenFor(theme.theme, ["color", "strong"])
            ),
            disabled: renderer.disabled.value,
            multiple: renderer.fieldType.value === "belongsToMany",
            onChange: updateValue
          },
          renderOptions(
            renderer.options.value,
            renderer.rawValue.value,
            renderer.fieldType.value === "belongsToMany"
          )
        );
      }

      return h("input", {
        class: classNameFor(
          theme.classMap,
          ["fieldRenderer", "input"],
          themeTokenFor(theme.theme, ["border", "muted"]),
          themeTokenFor(theme.theme, ["color", "strong"])
        ),
        disabled: renderer.disabled.value,
        placeholder: renderer.placeholder.value,
        type: renderer.inputType.value,
        value: String(renderer.rawValue.value ?? ""),
        onInput: updateValue
      });
    }

    return () => {
      if (renderer.renderState.value === "hidden") {
        return null;
      }

      const slotProps: FieldRendererSlotProps = {
        classMap: theme.classMap,
        errors: renderer.errors.value,
        field: renderer.field.value,
        mode: renderer.mode.value,
        renderState: renderer.renderState.value,
        theme: theme.theme,
        value: renderer.rawValue.value
      };

      const content = slots.field?.(slotProps) ??
        slots.default?.(slotProps) ?? [renderDefaultField()];

      return h(
        "div",
        {
          class: classNameFor(theme.classMap, ["fieldRenderer", "root"]),
          "data-field": renderer.attribute.value,
          "data-field-type": renderer.fieldType.value,
          "data-mode": renderer.mode.value
        },
        [
          h(
            "label",
            {
              class: classNameFor(
                theme.classMap,
                ["fieldRenderer", "label"],
                themeTokenFor(theme.theme, ["color", "strong"])
              )
            },
            renderer.label.value
          ),
          ...content,
          renderer.errors.value.length > 0
            ? h(
                "ul",
                {
                  class: classNameFor(
                    theme.classMap,
                    ["fieldRenderer", "error"],
                    themeTokenFor(theme.theme, ["color", "danger"])
                  ),
                  "data-testid": "field-errors"
                },
                renderer.errors.value.map((error) => h("li", error))
              )
            : null
        ]
      );
    };
  }
});
