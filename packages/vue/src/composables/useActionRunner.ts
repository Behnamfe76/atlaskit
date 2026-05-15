import { renderAuthorization } from "@atlaskit/adapter-contracts";
import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";

import type { ActionRunnerProps } from "../contracts/componentProps";

interface ActionLike {
  readonly disabled?: boolean;
  readonly execute?: (
    context: Record<string, unknown>
  ) => unknown | Promise<unknown>;
  readonly run?: (
    context: Record<string, unknown>
  ) => unknown | Promise<unknown>;
  readonly visible?: boolean;
}

function toAction(value: unknown): ActionLike {
  return (value ?? {}) as ActionLike;
}

export function useActionRunner(input: MaybeRefOrGetter<ActionRunnerProps>) {
  const options = computed(() => toValue(input));
  const executing = ref(options.value.state?.executing ?? false);
  const error = ref<unknown>(options.value.state?.error);
  const result = ref<unknown>(options.value.state?.result);

  const actions = computed(() =>
    options.value.actions.map((action) => toAction(action))
  );
  const disabled = computed(
    () =>
      options.value.state?.disabled ??
      actions.value.every(
        (action) =>
          renderAuthorization({
            executable: action.disabled !== true,
            visible: action.visible !== false
          }) !== "active"
      )
  );

  async function execute(action: unknown): Promise<unknown> {
    const candidate = toAction(action);
    const renderState = renderAuthorization({
      executable: candidate.disabled !== true,
      visible: candidate.visible !== false
    });

    if (renderState !== "active") {
      throw new Error("Action is not executable.");
    }

    const executor = candidate.execute ?? candidate.run;

    if (!executor) {
      throw new Error("Action does not define an executor.");
    }

    executing.value = true;
    error.value = undefined;

    try {
      const nextResult = await executor({
        ...(options.value.context ?? {}),
        selection: options.value.selection ?? []
      });
      result.value = nextResult;
      return nextResult;
    } catch (nextError) {
      error.value = nextError;
      throw nextError;
    } finally {
      executing.value = false;
    }
  }

  const state = computed(() => ({
    disabled: disabled.value,
    error: error.value,
    executing: executing.value,
    result: result.value
  }));

  return {
    actions,
    disabled,
    error,
    execute,
    executing,
    result,
    state
  };
}
