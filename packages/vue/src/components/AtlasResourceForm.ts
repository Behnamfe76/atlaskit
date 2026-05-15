import { computed, defineComponent, h, type PropType } from "vue";

import type { Field } from "@atlaskit/core";

import type {
  ResourceFormFieldSlotProps,
  ResourceFormSlotProps
} from "../contracts/slotProps";
import type { ResourceFormProps } from "../contracts/componentProps";
import { useAtlasTheme } from "../composables/useAtlasTheme";
import { useResourceForm } from "../composables/useResourceForm";
import { classNameFor, themeTokenFor } from "../theme/runtime";
import { AtlasFieldRenderer } from "./AtlasFieldRenderer";

function fieldValue(
  state: ResourceFormSlotProps["state"],
  attribute: string
): unknown {
  return state.values[attribute];
}

export const AtlasResourceForm = defineComponent({
  name: "AtlasResourceForm",
  props: {
    classMap: {
      default: undefined,
      type: Object as PropType<ResourceFormProps["classMap"]>
    },
    initialValues: {
      default: undefined,
      type: Object as PropType<ResourceFormProps["initialValues"]>
    },
    mode: {
      required: true,
      type: String as PropType<ResourceFormProps["mode"]>
    },
    record: {
      default: undefined,
      type: Object as PropType<ResourceFormProps["record"]>
    },
    recordId: {
      default: undefined,
      type: [String, Number] as PropType<ResourceFormProps["recordId"]>
    },
    resource: {
      required: true,
      type: [String, Object, Function] as PropType<
        ResourceFormProps["resource"]
      >
    },
    theme: {
      default: undefined,
      type: Object as PropType<ResourceFormProps["theme"]>
    }
  },
  setup(props, { slots }) {
    const form = useResourceForm(() => props);
    const theme = computed(() =>
      useAtlasTheme({
        classMap: props.classMap,
        theme: props.theme
      })
    );

    return () => {
      const themeContext = theme.value;
      const slotProps: ResourceFormSlotProps = {
        classMap: themeContext.classMap,
        fields: form.visibleFields.value,
        setValue: form.setValue,
        state: form.state.value,
        submit: form.submit,
        theme: themeContext.theme
      };

      const defaultContent = slots.default?.(slotProps);

      if (defaultContent) {
        return h(
          "form",
          {
            class: classNameFor(
              themeContext.classMap,
              ["resourceForm", "root"],
              themeTokenFor(themeContext.theme, ["surface", "card"]),
              themeTokenFor(themeContext.theme, ["border", "muted"])
            ),
            onSubmit: (event: Event) => {
              event.preventDefault();
              void form.submit();
            }
          },
          defaultContent
        );
      }

      return h(
        "form",
        {
          class: classNameFor(
            themeContext.classMap,
            ["resourceForm", "root"],
            themeTokenFor(themeContext.theme, ["surface", "card"]),
            themeTokenFor(themeContext.theme, ["border", "muted"])
          ),
          "data-testid": "resource-form",
          onSubmit: (event: Event) => {
            event.preventDefault();
            void form.submit();
          }
        },
        [
          ...form.visibleFields.value.map((field) => {
            const perFieldSlotProps: ResourceFormFieldSlotProps = {
              field,
              setValue: form.setValue,
              state: form.state.value
            };
            const customField =
              slots.field?.(perFieldSlotProps) ??
              slots[`field:${field.attribute}`]?.(perFieldSlotProps);

            if (customField) {
              return h(
                "div",
                {
                  "data-field": field.attribute
                },
                customField
              );
            }

            return h(AtlasFieldRenderer, {
              classMap: themeContext.classMap,
              errors: form.errors.value[field.attribute] ?? [],
              field: field as Field,
              key: field.attribute,
              mode: form.state.value.mode,
              state: form.state.value,
              theme: themeContext.theme,
              value: fieldValue(form.state.value, field.attribute),
              "onUpdate:value": (value: unknown) =>
                form.setValue(field.attribute, value)
            });
          }),
          h(
            "div",
            {
              class: classNameFor(themeContext.classMap, [
                "resourceForm",
                "actions"
              ])
            },
            slots.actions?.(slotProps) ?? [
              h(
                "button",
                {
                  class: classNameFor(
                    themeContext.classMap,
                    ["resourceForm", "submit"],
                    themeTokenFor(themeContext.theme, ["surface", "subtle"]),
                    themeTokenFor(themeContext.theme, ["color", "strong"])
                  ),
                  disabled: form.submitting.value,
                  type: "submit"
                },
                form.submitting.value ? "Submitting..." : "Submit"
              )
            ]
          )
        ]
      );
    };
  }
});
