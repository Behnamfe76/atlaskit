import { describe, expect, it } from "vitest";

import { QueryClient } from "../../../src";

describe("QueryClient", () => {
  it("tracks query state, subscriptions, optimistic updates, and invalidation", async () => {
    const client = new QueryClient();
    const key = ["products", 1] as const;
    const events: string[] = [];

    const unsubscribe = client.subscribe(key, (record) => {
      events.push(record.status);
    });

    await client.fetchQuery(key, async () => ({ id: 1, name: "Atlas" }));
    client.applyOptimisticUpdate(key, (current) => ({
      ...(current as { id: number; name: string }),
      name: "Updated"
    }));
    client.invalidateQueries(["products"]);

    expect(client.getQueryData(key)).toEqual({ id: 1, name: "Updated" });
    expect(client.getRecord(key)?.invalidated).toBe(true);
    expect(events).toContain("loading");
    expect(events).toContain("success");

    unsubscribe();
  });
});
