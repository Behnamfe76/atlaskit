import type {
  ActionExecutionState,
  FormState,
  ShowState,
  TableState
} from "@atlaskit/adapter-contracts";

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
