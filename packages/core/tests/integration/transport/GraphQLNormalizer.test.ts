import { describe, expect, it } from "vitest";

import { ResponseNormalizer } from "../../../src";

describe("GraphQLNormalizer", () => {
  it("normalizes nodes and connection payloads", () => {
    const collection = ResponseNormalizer.graphql({
      products: {
        nodes: [{ id: 1 }, { id: 2 }]
      }
    });
    const connection = ResponseNormalizer.graphql({
      products: {
        edges: [{ node: { id: 1 } }],
        pageInfo: {
          endCursor: "next",
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: "prev"
        }
      }
    });

    expect(collection.kind).toBe("collection");
    expect(connection.kind).toBe("cursorPaginate");
    expect(connection.pagination?.nextCursor).toBe("next");
  });
});
