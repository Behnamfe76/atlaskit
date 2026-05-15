import { describe, expect, it } from "vitest";

import { Atlas, EventBus, Resource, Text } from "../../../src";

class EventResource extends Resource {
  static override id = "events";
  static override uriKey = "events";

  override fields() {
    return [Text.make("Name", "name")];
  }
}

describe("lifecycle events", () => {
  it("publishes runtime events through the shared event bus", () => {
    const eventBus = new EventBus();
    const seen: string[] = [];
    eventBus.on("resource:resolved", (event) => {
      seen.push(String(event.type));
    });

    const runtime = Atlas.configure({
      eventBus,
      resources: [EventResource]
    });

    runtime.resolveResource("events");

    expect(seen).toEqual(["resource:resolved"]);
  });
});
