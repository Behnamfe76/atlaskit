export type AuthorizationRenderState = "active" | "disabled" | "hidden";

export interface AuthorizationRenderInput {
  readonly executable: boolean;
  readonly visible: boolean;
}

export function renderAuthorization({
  executable,
  visible
}: AuthorizationRenderInput): AuthorizationRenderState {
  if (!visible) {
    return "hidden";
  }

  return executable ? "active" : "disabled";
}
