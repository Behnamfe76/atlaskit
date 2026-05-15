import type { ActionExecutionState } from "./actionState";
import type { FormState } from "./formState";
import type { ShowState } from "./showState";
import type { TableState } from "./tableState";

export interface ResourceTableSlotProps {
  readonly state: TableState;
}

export interface ResourceFormSlotProps {
  readonly state: FormState;
}

export interface ResourceShowSlotProps {
  readonly state: ShowState;
}

export interface FieldRendererSlotProps {
  readonly errors: readonly string[];
  readonly mode: "index" | "show" | "create" | "edit";
  readonly value?: unknown;
}

export interface ActionRunnerSlotProps {
  readonly state: ActionExecutionState;
}
