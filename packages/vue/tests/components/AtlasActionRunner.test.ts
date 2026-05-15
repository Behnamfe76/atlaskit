import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { AtlasActionRunner } from "../../src";

describe("AtlasActionRunner", () => {
  it("renders visible actions and executes them", async () => {
    const execute = vi.fn(async () => ({ ok: true }));
    const wrapper = mount(AtlasActionRunner, {
      props: {
        actions: [
          { execute, label: "Run" },
          { execute, label: "Hidden", visible: false }
        ],
        resource: "products",
        selection: [{ id: 1 }]
      }
    });

    expect(wrapper.findAll("button")).toHaveLength(1);

    await wrapper.get("button").trigger("click");

    expect(execute).toHaveBeenCalledTimes(1);
  });
});
