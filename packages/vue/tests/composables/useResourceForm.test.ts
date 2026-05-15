import { afterEach, describe, expect, it } from "vitest";

import { Atlas } from "@atlaskit/core";
import { nextTick } from "vue";

import { useResourceForm } from "../../src/composables/useResourceForm";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("useResourceForm", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("validates fields and recalculates async dependencies", async () => {
    configureFixtureAtlas();

    const form = useResourceForm({
      initialValues: {
        status: "draft"
      },
      mode: "create",
      resource: "products"
    });

    await nextTick();
    await Promise.resolve();

    expect(
      form.visibleFields.value.map((field) => field.attribute)
    ).not.toContain("slug");

    form.setValue("name", "Trail Shoe");
    await nextTick();
    await Promise.resolve();
    await Promise.resolve();

    expect(form.visibleFields.value.map((field) => field.attribute)).toContain(
      "slug"
    );

    form.setValue("name", "");
    form.validate();

    expect(form.errors.value.name).toEqual(["required"]);
  });
});
