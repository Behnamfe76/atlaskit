import type { PlainObject } from "../../support/types";

import type { NormalizedResponse } from "../ResponseNormalizer";

export function normalizeRestResponse(
  payload: PlainObject
): NormalizedResponse {
  const data = payload.data;
  const meta = (payload.meta as PlainObject | undefined) ?? {};

  if (Array.isArray(data)) {
    if ("current_page" in meta && "last_page" in meta) {
      return {
        data,
        kind: "paginate",
        meta,
        pagination: {
          currentPage: Number(meta.current_page),
          lastPage: Number(meta.last_page),
          perPage: Number(meta.per_page),
          total: Number(meta.total)
        },
        sourceMeta: payload,
        transport: "rest"
      };
    }

    if ("current_page" in meta) {
      return {
        data,
        kind: "simplePaginate",
        meta,
        pagination: {
          currentPage: Number(meta.current_page),
          hasNextPage: Boolean(meta.has_next_page),
          hasPreviousPage: Boolean(meta.has_previous_page),
          perPage: Number(meta.per_page)
        },
        sourceMeta: payload,
        transport: "rest"
      };
    }

    if ("next_cursor" in meta || "prev_cursor" in meta) {
      return {
        data,
        kind: "cursorPaginate",
        meta,
        pagination: {
          currentCursor: meta.current_cursor,
          hasNextPage: Boolean(meta.has_next_page),
          hasPreviousPage: Boolean(meta.has_previous_page),
          nextCursor: meta.next_cursor,
          previousCursor: meta.prev_cursor
        },
        sourceMeta: payload,
        transport: "rest"
      };
    }

    return {
      data,
      kind: "collection",
      meta,
      sourceMeta: payload,
      transport: "rest"
    };
  }

  return {
    data,
    kind: "single",
    meta,
    sourceMeta: payload,
    transport: "rest"
  };
}
