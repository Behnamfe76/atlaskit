import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { Text } from "@atlaskit/core";

import { AtlasFieldRenderer } from "../../src";

describe("theme token overrides", () => {
  it("applies theme token classes to field rendering surfaces", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        field: Text.make("Name", "name"),
        mode: "create",
        theme: {
          border: {
            muted: "border-emerald-500"
          },
          color: {
            strong: "text-emerald-900"
          }
        },
        value: "Runner"
      }
    });

    expect(wrapper.find("label").attributes("class")).toContain(
      "text-emerald-900"
    );
    expect(wrapper.find("input").attributes("class")).toContain(
      "border-emerald-500"
    );
  });
});
