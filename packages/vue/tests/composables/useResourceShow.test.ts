import { afterEach, describe, expect, it } from "vitest";

import { Atlas } from "@atlaskit/core";

import { useResourceShow } from "../../src/composables/useResourceShow";
import { configureFixtureAtlas } from "../helpers/fixtureResource";

describe("useResourceShow", () => {
  afterEach(() => {
    Atlas.reset();
  });

  it("binds record state from QueryClient subscriptions", () => {
    const runtime = configureFixtureAtlas();
    const show = useResourceShow({
      resource: "products",
      resourceId: 7
    });

    runtime.queryClient.setQueryData(show.queryKey.value!, {
      id: 7,
      name: "Road Bike"
    });

    expect(show.loading.value).toBe(false);
    expect(show.record.value).toEqual({
      id: 7,
      name: "Road Bike"
    });
  });
});
