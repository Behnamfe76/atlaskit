import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { Atlas } from "@atlaskit/core";

import { AtlasResourceShow } from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("AtlasResourceShow", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("renders show state from a preloaded record", async () => {
    configureFixtureAtlas();

    const wrapper = mount(AtlasResourceShow, {
      props: {
        record: {
          category: { label: "Books" },
          name: "Runner",
          tags: [{ label: "Alpha" }]
        },
        resource: "products"
      }
    });

    await nextTick();

    expect(wrapper.text()).toContain("Runner");
    expect(wrapper.text()).toContain("Books");
    expect(wrapper.text()).toContain("Alpha");
  });
});
