import type { PaginationPayload } from "../transport/ResponseNormalizer";

export function createPaginationState(
  pagination: PaginationPayload
): PaginationPayload {
  return {
    ...pagination
  };
}
