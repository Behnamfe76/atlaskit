import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { Atlas } from "@atlaskit/core";

import { AtlasResourceTable } from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("class map overrides", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("merges resource table override classes with defaults", async () => {
    const runtime = configureFixtureAtlas();
    const tableState = runtime.queryClient;
    tableState.setQueryData(
      [
        "atlas",
        "products",
        "table",
        { filters: {}, page: 1, perPage: 15, search: "", sort: null },
        {}
      ],
      {
        data: [{ id: 1, name: "Runner" }]
      }
    );

    const wrapper = mount(AtlasResourceTable, {
      props: {
        classMap: {
          resourceTable: {
            root: "ring-2 ring-sky-500",
            search: "max-w-xs"
          }
        },
        resource: "products"
      }
    });

    expect(wrapper.attributes("class")).toContain("overflow-hidden");
    expect(wrapper.attributes("class")).toContain("ring-2");
    expect(
      wrapper.get('[data-testid="resource-table-search"]').attributes("class")
    ).toContain("max-w-xs");
  });
});
