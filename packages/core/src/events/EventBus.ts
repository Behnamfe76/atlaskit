import type { AtlasEvent, EventHandler } from "./eventTypes";

export class EventBus {
  readonly #listeners = new Map<string, Set<EventHandler>>();

  emit<TPayload>(type: string, payload?: TPayload): void {
    const event: AtlasEvent<TPayload> =
      payload === undefined
        ? {
            timestamp: Date.now(),
            type
          }
        : {
            payload,
            timestamp: Date.now(),
            type
          };

    for (const handler of this.#listeners.get(type) ?? []) {
      handler(event);
    }
  }

  on<TPayload>(type: string, handler: EventHandler<TPayload>): () => void {
    const handlers = this.#listeners.get(type) ?? new Set();
    handlers.add(handler as EventHandler);
    this.#listeners.set(type, handlers);

    return () => {
      handlers.delete(handler as EventHandler);
    };
  }
}
