export interface ActionExecutionState {
  readonly disabled: boolean;
  readonly error?: unknown;
  readonly executing: boolean;
  readonly result?: unknown;
}
