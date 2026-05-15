import type { ResourceReference } from "../resources/resourceReference";
import type { ClassMap } from "../theme/classMap";
import type { ThemeTokens } from "../theme/themeTokens";
import type { ActionExecutionState } from "./actionState";
import type { FormState } from "./formState";
import type { ShowState } from "./showState";
import type { TableState } from "./tableState";

export interface BaseAdapterProps {
  readonly classMap?: ClassMap;
  readonly resource: ResourceReference;
  readonly theme?: ThemeTokens;
}

export interface ResourceTableProps extends BaseAdapterProps {
  readonly state?: Partial<TableState>;
}

export interface ResourceFormProps extends BaseAdapterProps {
  readonly initialValues?: Readonly<Record<string, unknown>>;
  readonly mode: "create" | "edit";
  readonly recordId?: string | number;
}

export interface ResourceShowProps extends BaseAdapterProps {
  readonly record?: Readonly<Record<string, unknown>>;
  readonly resourceId?: string | number;
  readonly state?: Partial<ShowState>;
}

export interface FieldRendererProps {
  readonly errors?: readonly string[];
  readonly field: Readonly<Record<string, unknown>>;
  readonly mode: "index" | "show" | "create" | "edit";
  readonly state?: Partial<FormState>;
  readonly value?: unknown;
}

export interface ActionRunnerProps extends BaseAdapterProps {
  readonly actions: readonly unknown[];
  readonly context?: Readonly<Record<string, unknown>>;
  readonly selection?: readonly unknown[];
  readonly state?: Partial<ActionExecutionState>;
}
