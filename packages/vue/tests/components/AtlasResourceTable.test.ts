import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { Atlas } from "@atlaskit/core";

import { AtlasResourceTable, useResourceTable } from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("AtlasResourceTable", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("renders table rows from query client data", async () => {
    const runtime = configureFixtureAtlas();
    const table = useResourceTable({
      resource: "products"
    });

    runtime.queryClient.setQueryData(table.queryKey.value, {
      data: [{ id: 1, name: "Runner" }]
    });

    const wrapper = mount(AtlasResourceTable, {
      props: {
        resource: "products"
      }
    });

    await nextTick();

    expect(wrapper.text()).toContain("Runner");
    expect(wrapper.find("table").exists()).toBe(true);
  });
});
