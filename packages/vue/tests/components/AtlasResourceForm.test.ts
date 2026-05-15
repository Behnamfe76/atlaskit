import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { Atlas } from "@atlaskit/core";

import { AtlasResourceForm } from "../../src";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("AtlasResourceForm", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("renders visible create fields and submit action", async () => {
    configureFixtureAtlas();

    const wrapper = mount(AtlasResourceForm, {
      props: {
        mode: "create",
        resource: "products"
      }
    });

    await nextTick();
    await Promise.resolve();

    expect(wrapper.text()).toContain("Name");
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
});
