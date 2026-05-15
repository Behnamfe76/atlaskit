export interface TableQueryState {
  readonly filters: Readonly<Record<string, unknown>>;
  readonly page: number;
  readonly perPage: number;
  readonly search: string;
  readonly sort: string | null;
}

export interface TableState extends TableQueryState {
  readonly error?: unknown;
  readonly loading: boolean;
  readonly mode: "controlled" | "uncontrolled";
  readonly selectedRows: readonly unknown[];
}
