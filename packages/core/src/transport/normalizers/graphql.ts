import type { PlainObject } from "../../support/types";

import type { NormalizedResponse } from "../ResponseNormalizer";

function firstRoot(payload: PlainObject): unknown {
  const [firstKey] = Object.keys(payload);
  return firstKey ? payload[firstKey] : payload;
}

export function normalizeGraphqlResponse(
  payload: PlainObject
): NormalizedResponse {
  const root = firstRoot(payload);

  if (root && typeof root === "object" && !Array.isArray(root)) {
    const objectRoot = root as PlainObject;

    if (Array.isArray(objectRoot.nodes)) {
      return {
        data: objectRoot.nodes,
        kind: "collection",
        meta: {},
        sourceMeta: payload,
        transport: "graphql"
      };
    }

    if (Array.isArray(objectRoot.edges) && objectRoot.pageInfo) {
      const nodes = objectRoot.edges
        .map((edge) =>
          edge && typeof edge === "object"
            ? (edge as PlainObject).node
            : undefined
        )
        .filter((node) => node !== undefined);
      const pageInfo = objectRoot.pageInfo as PlainObject;

      return {
        data: nodes,
        kind: "cursorPaginate",
        meta: {},
        pagination: {
          currentCursor: pageInfo.startCursor,
          hasNextPage: Boolean(pageInfo.hasNextPage),
          hasPreviousPage: Boolean(pageInfo.hasPreviousPage),
          nextCursor: pageInfo.endCursor,
          previousCursor: pageInfo.startCursor
        },
        sourceMeta: payload,
        transport: "graphql"
      };
    }
  }

  if (Array.isArray(root)) {
    return {
      data: root,
      kind: "collection",
      meta: {},
      sourceMeta: payload,
      transport: "graphql"
    };
  }

  return {
    data: root,
    kind: "single",
    meta: {},
    sourceMeta: payload,
    transport: "graphql"
  };
}
