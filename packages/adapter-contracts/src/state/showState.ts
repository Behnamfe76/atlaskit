export interface ShowState {
  readonly error?: unknown;
  readonly loading: boolean;
  readonly record?: Readonly<Record<string, unknown>>;
}
