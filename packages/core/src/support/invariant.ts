import { AtlasError } from "./errors";

export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new AtlasError(message);
  }
}
