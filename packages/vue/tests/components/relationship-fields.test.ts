import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import { Atlas } from "@atlaskit/core";

import {
  AtlasResourceForm,
  AtlasResourceShow,
  AtlasResourceTable,
  useResourceTable
} from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("relationship field parity", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("renders belongsTo and belongsToMany in table and show surfaces", async () => {
    const runtime = configureFixtureAtlas();
    const table = useResourceTable({
      resource: "products"
    });

    runtime.queryClient.setQueryData(table.queryKey.value, {
      data: [
        {
          category: {
            label: "Books"
          },
          id: 1,
          tags: [{ label: "Alpha" }, { name: "Beta" }]
        }
      ]
    });

    const tableWrapper = mount(AtlasResourceTable, {
      props: {
        resource: "products"
      }
    });

    const showWrapper = mount(AtlasResourceShow, {
      props: {
        record: {
          category: {
            label: "Books"
          },
          tags: [{ label: "Alpha" }, { name: "Beta" }]
        },
        resource: "products"
      }
    });

    await nextTick();

    expect(tableWrapper.text()).toContain("Books");
    expect(tableWrapper.text()).toContain("Alpha");
    expect(showWrapper.text()).toContain("Books");
    expect(showWrapper.text()).toContain("Beta");
  });

  it("renders relation inputs for form mode", async () => {
    configureFixtureAtlas();

    const wrapper = mount(AtlasResourceForm, {
      props: {
        initialValues: {
          category: "books",
          tags: ["alpha", "beta"]
        },
        mode: "edit",
        resource: "products"
      }
    });

    await nextTick();

    expect(wrapper.findAll("select").length).toBeGreaterThanOrEqual(2);
    expect(
      wrapper
        .findAll("select")
        .some(
          (selectWrapper) => selectWrapper.attributes("multiple") !== undefined
        )
    ).toBe(true);
    expect(wrapper.text()).toContain("Category");
    expect(wrapper.text()).toContain("Tags");
  });
});
