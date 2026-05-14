import {
  DuplicateRegistrationError,
  MissingResourceError
} from "../support/errors";

export class BaseRegistry<K, V> {
  readonly #entries = new Map<K, V>();

  constructor(private readonly label: string) {}

  protected registerEntry(key: K, value: V): void {
    if (this.#entries.has(key)) {
      throw new DuplicateRegistrationError(this.label, "key", String(key));
    }

    this.#entries.set(key, value);
  }

  all(): readonly V[] {
    return this.entries();
  }

  entries(): readonly V[] {
    return Object.freeze([...this.#entries.values()]);
  }

  get(key: K): V {
    const entry = this.#entries.get(key);

    if (entry === undefined) {
      throw new MissingResourceError("id", String(key));
    }

    return entry;
  }

  has(key: K): boolean {
    return this.#entries.has(key);
  }
}
