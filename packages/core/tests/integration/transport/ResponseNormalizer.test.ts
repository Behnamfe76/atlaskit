import { describe, expect, it } from "vitest";

import { ResponseNormalizer } from "../../../src";

describe("ResponseNormalizer", () => {
  it("normalizes REST collection and paginate payloads", () => {
    const collection = ResponseNormalizer.rest({
      data: [{ id: 1 }, { id: 2 }],
      meta: { total: 2 }
    });
    const paginate = ResponseNormalizer.rest({
      data: [{ id: 1 }],
      meta: {
        current_page: 1,
        last_page: 3,
        per_page: 10,
        total: 25
      }
    });

    expect(collection.kind).toBe("collection");
    expect(paginate.kind).toBe("paginate");
    expect(paginate.pagination?.total).toBe(25);
  });
});
