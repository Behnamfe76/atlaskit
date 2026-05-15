import type {
  ActionExecutionState,
  ClassMap,
  FormState,
  ResourceReference,
  ShowState,
  TableState,
  ThemeTokens
} from "@atlaskit/adapter-contracts";

export interface BaseAdapterProps {
  readonly classMap?: ClassMap;
  readonly resource: ResourceReference;
  readonly theme?: ThemeTokens;
}

export interface ResourceTableProps extends BaseAdapterProps {
  readonly queryOptions?: Record<string, unknown>;
  readonly state?: Partial<TableState>;
}

export interface ResourceFormProps extends BaseAdapterProps {
  readonly initialValues?: Record<string, unknown>;
  readonly mode: "create" | "edit";
  readonly recordId?: string | number;
}

export interface ResourceShowProps extends BaseAdapterProps {
  readonly record?: Record<string, unknown>;
  readonly resourceId?: string | number;
  readonly state?: Partial<ShowState>;
}

export interface FieldRendererProps {
  readonly errors?: readonly string[];
  readonly field: Record<string, unknown>;
  readonly mode: "index" | "show" | "create" | "edit";
  readonly state?: Partial<FormState>;
  readonly value?: unknown;
}

export interface ActionRunnerProps extends BaseAdapterProps {
  readonly actions: readonly unknown[];
  readonly context?: Record<string, unknown>;
  readonly selection?: readonly unknown[];
  readonly state?: Partial<ActionExecutionState>;
}
