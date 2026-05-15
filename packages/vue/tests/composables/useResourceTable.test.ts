import { afterEach, describe, expect, it } from "vitest";

import { Atlas } from "@atlaskit/core";

import { useResourceTable } from "../../src/composables/useResourceTable";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("useResourceTable", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("tracks controlled state and query cache updates", () => {
    const runtime = configureFixtureAtlas();
    const table = useResourceTable({
      resource: "products",
      state: {
        filters: {},
        loading: false,
        mode: "controlled",
        page: 2,
        perPage: 10,
        search: "shoe",
        selectedRows: [],
        sort: "name"
      }
    });

    runtime.queryClient.setQueryData(table.queryKey.value, {
      data: [{ id: 1, name: "Runner" }]
    });

    expect(table.state.value.mode).toBe("controlled");
    expect(table.search.value).toBe("shoe");
    expect(table.rows.value).toEqual([{ id: 1, name: "Runner" }]);
  });
});
