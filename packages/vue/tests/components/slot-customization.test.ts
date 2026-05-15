import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";

import { Atlas } from "@atlaskit/core";

import {
  AtlasActionRunner,
  AtlasResourceForm,
  AtlasResourceTable,
  useResourceTable
} from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("slot customization", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("allows table cell overrides without changing table state", async () => {
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
          name: "Runner"
        }
      ]
    });

    const wrapper = mount(AtlasResourceTable, {
      props: {
        resource: "products"
      },
      slots: {
        cell: ({ field, value }) =>
          field.attribute === "category"
            ? h(
                "span",
                { "data-testid": "category-slot" },
                String((value as { label: string }).label)
              )
            : undefined
      }
    });

    await nextTick();

    expect(wrapper.get('[data-testid="category-slot"]').text()).toBe("Books");
    expect(
      wrapper.get('[data-testid="resource-table-search"]').element
    ).toBeTruthy();
  });

  it("allows field slot overrides in forms while preserving state updates", async () => {
    configureFixtureAtlas();

    const wrapper = mount(AtlasResourceForm, {
      props: {
        mode: "create",
        resource: "products"
      },
      slots: {
        field: ({ field, setValue, state }) =>
          field.attribute === "name"
            ? h(
                "button",
                {
                  "data-testid": "name-slot",
                  type: "button",
                  onClick: () => setValue("name", "Custom Name")
                },
                `dirty:${String(state.dirty)}`
              )
            : undefined
      }
    });

    await nextTick();

    await wrapper.get('[data-testid="name-slot"]').trigger("click");
    await nextTick();

    expect(wrapper.get('[data-testid="name-slot"]').text()).toContain(
      "dirty:true"
    );
  });

  it("allows action slot overrides while preserving execution semantics", async () => {
    const execute = vi.fn(async () => "done");

    const wrapper = mount(AtlasActionRunner, {
      props: {
        actions: [
          {
            execute,
            label: "Archive"
          }
        ],
        resource: "products"
      },
      slots: {
        action: ({ action, execute: run }) =>
          h(
            "button",
            {
              "data-testid": "action-slot",
              type: "button",
              onClick: () => run(action)
            },
            "Run custom"
          )
      }
    });

    await wrapper.get('[data-testid="action-slot"]').trigger("click");

    expect(execute).toHaveBeenCalledTimes(1);
  });
});
