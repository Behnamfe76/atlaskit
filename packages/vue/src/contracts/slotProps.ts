import type { Field } from "@atlaskit/core";
import type {
  ActionExecutionState,
  ClassMap,
  FormState,
  ShowState,
  TableState,
  ThemeTokens
} from "@atlaskit/adapter-contracts";

export interface ResourceTableSlotProps {
  readonly classMap: ClassMap;
  readonly fields: readonly Field[];
  readonly rows: readonly unknown[];
  readonly state: TableState;
  readonly theme: ThemeTokens;
}

export interface ResourceTableRowSlotProps {
  readonly fields: readonly Field[];
  readonly row: unknown;
  readonly rowIndex: number;
  readonly state: TableState;
}

export interface ResourceTableCellSlotProps {
  readonly field: Field;
  readonly row: unknown;
  readonly rowIndex: number;
  readonly state: TableState;
  readonly value: unknown;
}

export interface ResourceFormSlotProps {
  readonly classMap: ClassMap;
  readonly fields: readonly Field[];
  readonly setValue: (attribute: string, value: unknown) => void;
  readonly state: FormState;
  readonly submit: () => Promise<unknown>;
  readonly theme: ThemeTokens;
}

export interface ResourceFormFieldSlotProps {
  readonly field: Field;
  readonly setValue: (attribute: string, value: unknown) => void;
  readonly state: FormState;
}

export interface ResourceShowSlotProps {
  readonly classMap: ClassMap;
  readonly fields: readonly Field[];
  readonly record?: Readonly<Record<string, unknown>>;
  readonly state: ShowState;
  readonly theme: ThemeTokens;
}

export interface FieldRendererSlotProps {
  readonly classMap: ClassMap;
  readonly errors: readonly string[];
  readonly field: Field;
  readonly mode: "index" | "show" | "create" | "edit";
  readonly renderState: "active" | "disabled" | "hidden";
  readonly theme: ThemeTokens;
  readonly value?: unknown;
}

export interface ActionRunnerSlotProps {
  readonly action: unknown;
  readonly actionIndex: number;
  readonly classMap: ClassMap;
  readonly execute: (action: unknown) => Promise<unknown>;
  readonly renderState: "active" | "disabled" | "hidden";
  readonly state: ActionExecutionState;
  readonly theme: ThemeTokens;
}
