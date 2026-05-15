import type { EventBus } from "../events/EventBus";

export function emitResourceResolved(
  eventBus: EventBus,
  resourceId: string
): void {
  eventBus.emit("resource:resolved", {
    resourceId
  });
}
