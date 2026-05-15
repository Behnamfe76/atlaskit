import { renderAuthorization } from "@atlaskit/adapter-contracts";
import { computed, defineComponent, h, type PropType } from "vue";

import type { ActionRunnerSlotProps } from "../contracts/slotProps";
import type { ActionRunnerProps } from "../contracts/componentProps";
import { useActionRunner } from "../composables/useActionRunner";
import { useAtlasTheme } from "../composables/useAtlasTheme";
import { classNameFor, themeTokenFor } from "../theme/runtime";

interface ActionLike {
  readonly disabled?: boolean;
  readonly label?: string;
  readonly name?: string;
  readonly visible?: boolean;
}

function toAction(value: unknown): ActionLike {
  return (value ?? {}) as ActionLike;
}

function actionLabel(action: ActionLike, index: number): string {
  return action.label ?? action.name ?? `Action ${index + 1}`;
}

export const AtlasActionRunner = defineComponent({
  name: "AtlasActionRunner",
  props: {
    actions: {
      required: true,
      type: Array as PropType<ActionRunnerProps["actions"]>
    },
    classMap: {
      default: undefined,
      type: Object as PropType<ActionRunnerProps["classMap"]>
    },
    context: {
      default: undefined,
      type: Object as PropType<ActionRunnerProps["context"]>
    },
    resource: {
      required: true,
      type: [String, Object, Function] as PropType<
        ActionRunnerProps["resource"]
      >
    },
    selection: {
      default: undefined,
      type: Array as PropType<ActionRunnerProps["selection"]>
    },
    state: {
      default: undefined,
      type: Object as PropType<ActionRunnerProps["state"]>
    },
    theme: {
      default: undefined,
      type: Object as PropType<ActionRunnerProps["theme"]>
    }
  },
  setup(props, { slots }) {
    const runner = useActionRunner(() => props);
    const theme = computed(() =>
      useAtlasTheme({
        classMap: props.classMap,
        theme: props.theme
      })
    );

    return () => {
      const themeContext = theme.value;

      if (runner.actions.value.length === 0) {
        return null;
      }

      return h(
        "div",
        {
          class: classNameFor(
            themeContext.classMap,
            ["actionRunner", "root"],
            themeTokenFor(themeContext.theme, ["color", "accent"])
          ),
          "data-testid": "action-runner"
        },
        runner.actions.value.flatMap((action, actionIndex) => {
          const candidate = toAction(action);
          const renderState = renderAuthorization({
            executable: candidate.disabled !== true,
            visible: candidate.visible !== false
          });

          if (renderState === "hidden") {
            return [];
          }

          const slotProps: ActionRunnerSlotProps = {
            action,
            actionIndex,
            classMap: themeContext.classMap,
            execute: runner.execute,
            renderState,
            state: runner.state.value,
            theme: themeContext.theme
          };

          const content =
            slots.action?.(slotProps) ?? slots.default?.(slotProps);

          if (content) {
            return content;
          }

          return [
            h(
              "button",
              {
                class: classNameFor(
                  themeContext.classMap,
                  ["actionRunner", "button"],
                  renderState === "disabled"
                    ? classNameFor(themeContext.classMap, [
                        "actionRunner",
                        "disabled"
                      ])
                    : undefined,
                  themeTokenFor(themeContext.theme, ["surface", "subtle"]),
                  themeTokenFor(themeContext.theme, ["color", "strong"])
                ),
                disabled: renderState !== "active" || runner.executing.value,
                "data-action-index": String(actionIndex),
                type: "button",
                onClick: () => runner.execute(action)
              },
              actionLabel(candidate, actionIndex)
            )
          ];
        })
      );
    };
  }
});
