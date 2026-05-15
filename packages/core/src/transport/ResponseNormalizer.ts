import type { PlainObject } from "../support/types";

import { normalizeGraphqlResponse } from "./normalizers/graphql";
import { normalizeRestResponse } from "./normalizers/rest";

export interface PaginationPayload {
  readonly currentCursor?: unknown;
  readonly currentPage?: number;
  readonly hasNextPage?: boolean;
  readonly hasPreviousPage?: boolean;
  readonly lastPage?: number;
  readonly nextCursor?: unknown;
  readonly perPage?: number;
  readonly previousCursor?: unknown;
  readonly total?: number;
}

export interface NormalizedResponse {
  readonly data: unknown;
  readonly errors?: unknown;
  readonly kind:
    | "single"
    | "collection"
    | "paginate"
    | "simplePaginate"
    | "cursorPaginate";
  readonly meta: PlainObject;
  readonly pagination?: PaginationPayload;
  readonly sourceMeta: unknown;
  readonly transport: "rest" | "graphql";
}

export class ResponseNormalizer {
  static graphql(payload: PlainObject): NormalizedResponse {
    return normalizeGraphqlResponse(payload);
  }

  static rest(payload: PlainObject): NormalizedResponse {
    return normalizeRestResponse(payload);
  }
}
