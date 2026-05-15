import { BelongsToMany, Text } from "@atlaskit/core";
import { describe, expect, it } from "vitest";

import { useFieldRenderer } from "../../src/composables/useFieldRenderer";

describe("useFieldRenderer", () => {
  it("formats relationship values and respects dependency visibility", () => {
    const field = BelongsToMany.make("Tags", "tags");
    const renderer = useFieldRenderer({
      field,
      mode: "show",
      state: {
        dependencyVisibility: {
          tags: true
        },
        dirty: false,
        errors: {},
        mode: "edit",
        submitting: false,
        values: {}
      },
      value: [{ label: "Alpha" }, { name: "Beta" }]
    });

    expect(renderer.displayValue.value).toBe("Alpha, Beta");
    expect(renderer.renderState.value).toBe("active");
  });

  it("hides fields when dependency visibility removes them", () => {
    const field = Text.make("Name", "name");
    const renderer = useFieldRenderer({
      field,
      mode: "create",
      state: {
        dependencyVisibility: {
          name: false
        },
        dirty: false,
        errors: {},
        mode: "create",
        submitting: false,
        values: {}
      }
    });

    expect(renderer.renderState.value).toBe("hidden");
  });
});
