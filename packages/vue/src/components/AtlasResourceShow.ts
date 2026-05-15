import { computed, defineComponent, h, type PropType } from "vue";

import type { Field } from "@atlaskit/core";

import type { ResourceShowSlotProps } from "../contracts/slotProps";
import type { ResourceShowProps } from "../contracts/componentProps";
import { useAtlasTheme } from "../composables/useAtlasTheme";
import { useResourceShow } from "../composables/useResourceShow";
import { classNameFor, themeTokenFor } from "../theme/runtime";
import { AtlasActionRunner } from "./AtlasActionRunner";
import { AtlasFieldRenderer } from "./AtlasFieldRenderer";

export const AtlasResourceShow = defineComponent({
  name: "AtlasResourceShow",
  props: {
    classMap: {
      default: undefined,
      type: Object as PropType<ResourceShowProps["classMap"]>
    },
    record: {
      default: undefined,
      type: Object as PropType<ResourceShowProps["record"]>
    },
    resource: {
      required: true,
      type: [String, Object, Function] as PropType<
        ResourceShowProps["resource"]
      >
    },
    resourceId: {
      default: undefined,
      type: [String, Number] as PropType<ResourceShowProps["resourceId"]>
    },
    state: {
      default: undefined,
      type: Object as PropType<ResourceShowProps["state"]>
    },
    theme: {
      default: undefined,
      type: Object as PropType<ResourceShowProps["theme"]>
    }
  },
  setup(props, { slots }) {
    const show = useResourceShow(() => props);
    const theme = computed(() =>
      useAtlasTheme({
        classMap: props.classMap,
        theme: props.theme
      })
    );

    const visibleFields = computed(() =>
      show.fields.value.filter((field) =>
        (field as Field).isVisibleOn("detail")
      )
    );

    return () => {
      const themeContext = theme.value;
      const slotProps: ResourceShowSlotProps = {
        classMap: themeContext.classMap,
        fields: visibleFields.value as Field[],
        record: show.record.value,
        state: show.state.value,
        theme: themeContext.theme
      };

      const defaultContent = slots.default?.(slotProps);

      if (defaultContent) {
        return h(
          "section",
          {
            class: classNameFor(
              themeContext.classMap,
              ["resourceShow", "root"],
              themeTokenFor(themeContext.theme, ["surface", "card"]),
              themeTokenFor(themeContext.theme, ["border", "muted"])
            )
          },
          defaultContent
        );
      }

      if (show.loading.value) {
        return h(
          "section",
          {
            class: classNameFor(themeContext.classMap, ["resourceShow", "root"])
          },
          slots.loading?.(slotProps) ?? "Loading..."
        );
      }

      if (show.error.value) {
        return h(
          "section",
          {
            class: classNameFor(
              themeContext.classMap,
              ["resourceShow", "root"],
              themeTokenFor(themeContext.theme, ["color", "danger"])
            )
          },
          slots.error?.(slotProps) ?? String(show.error.value)
        );
      }

      return h(
        "section",
        {
          class: classNameFor(
            themeContext.classMap,
            ["resourceShow", "root"],
            themeTokenFor(themeContext.theme, ["surface", "card"]),
            themeTokenFor(themeContext.theme, ["border", "muted"])
          ),
          "data-testid": "resource-show"
        },
        [
          h(
            "div",
            {
              class: classNameFor(themeContext.classMap, [
                "resourceShow",
                "section"
              ])
            },
            visibleFields.value.map((field) =>
              h(AtlasFieldRenderer, {
                classMap: themeContext.classMap,
                field: field as Field,
                key: field.attribute,
                mode: "show",
                theme: themeContext.theme,
                value: show.record.value?.[field.attribute]
              })
            )
          ),
          show.actions.value.length > 0
            ? h(AtlasActionRunner, {
                actions: show.actions.value,
                classMap: themeContext.classMap,
                context: {
                  record: show.record.value
                },
                resource: props.resource,
                selection: show.record.value ? [show.record.value] : [],
                theme: themeContext.theme
              })
            : null
        ]
      );
    };
  }
});
