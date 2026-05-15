import { BelongsTo, BelongsToMany, Text } from "@atlaskit/core";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import { AtlasFieldRenderer } from "../../src/components/AtlasFieldRenderer";

describe("AtlasFieldRenderer", () => {
  it("renders validation errors for form fields", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        errors: ["required"],
        field: Text.make("Name", "name"),
        mode: "create",
        value: ""
      }
    });

    expect(wrapper.get('[data-testid="field-errors"]').text()).toContain(
      "required"
    );
  });

  it("renders relationship values for show mode", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        field: BelongsTo.make("Category", "category"),
        mode: "show",
        value: {
          label: "Books"
        }
      }
    });

    expect(wrapper.get('[data-testid="field-text"]').text()).toBe("Books");
  });

  it("renders relation collections for belongsToMany", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        field: BelongsToMany.make("Tags", "tags"),
        mode: "show",
        value: [{ label: "Alpha" }, { name: "Beta" }]
      }
    });

    expect(wrapper.get('[data-testid="field-list"]').text()).toContain("Alpha");
    expect(wrapper.get('[data-testid="field-list"]').text()).toContain("Beta");
  });

  it("supports slot overrides", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        field: Text.make("Name", "name"),
        mode: "index",
        value: "Runner"
      },
      slots: {
        field: ({ value }) =>
          h(
            "strong",
            {
              "data-testid": "custom-slot"
            },
            String(value)
          )
      }
    });

    expect(wrapper.get('[data-testid="custom-slot"]').text()).toBe("Runner");
  });

  it("hides the field when dependency visibility is false", () => {
    const wrapper = mount(AtlasFieldRenderer, {
      props: {
        field: Text.make("Slug", "slug"),
        mode: "create",
        state: {
          dependencyVisibility: {
            slug: false
          },
          dirty: false,
          errors: {},
          mode: "create",
          submitting: false,
          values: {}
        }
      }
    });

    expect(wrapper.html()).toBe("");
  });
});
