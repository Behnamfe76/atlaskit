export interface FormState {
  readonly dependencyVisibility: Readonly<Record<string, boolean>>;
  readonly dirty: boolean;
  readonly errors: Readonly<Record<string, readonly string[]>>;
  readonly mode: "create" | "edit";
  readonly submitResult?: unknown;
  readonly submitting: boolean;
  readonly values: Readonly<Record<string, unknown>>;
}
