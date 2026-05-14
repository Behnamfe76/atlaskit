import {
  DuplicateRegistrationError,
  MissingResourceError
} from "../support/errors";
import { extractResourceMeta } from "../resources/resourceMeta";
import type {
  ResourceClass,
  ResourceMetadata
} from "../resources/resourceTypes";

export class ResourceRegistry {
  readonly #byId = new Map<string, ResourceClass>();
  readonly #byUriKey = new Map<string, ResourceClass>();
  readonly #metadata = new Map<string, ResourceMetadata>();

  all(): readonly ResourceClass[] {
    return Object.freeze([...this.#byId.values()]);
  }

  getById(id: string): ResourceClass {
    const resourceClass = this.#byId.get(id);

    if (!resourceClass) {
      throw new MissingResourceError("id", id);
    }

    return resourceClass;
  }

  getByUriKey(uriKey: string): ResourceClass {
    const resourceClass = this.#byUriKey.get(uriKey);

    if (!resourceClass) {
      throw new MissingResourceError("uriKey", uriKey);
    }

    return resourceClass;
  }

  metadataFor(identifier: string): ResourceMetadata {
    const metadata = this.#metadata.get(identifier);

    if (!metadata) {
      throw new MissingResourceError("id", identifier);
    }

    return metadata;
  }

  register(resourceClass: ResourceClass): this {
    const metadata = extractResourceMeta(resourceClass);

    if (this.#byId.has(metadata.id)) {
      throw new DuplicateRegistrationError(
        "ResourceRegistry",
        "id",
        metadata.id
      );
    }

    if (this.#byUriKey.has(metadata.uriKey)) {
      throw new DuplicateRegistrationError(
        "ResourceRegistry",
        "uriKey",
        metadata.uriKey
      );
    }

    this.#byId.set(metadata.id, resourceClass);
    this.#byUriKey.set(metadata.uriKey, resourceClass);
    this.#metadata.set(metadata.id, metadata);
    this.#metadata.set(metadata.uriKey, metadata);

    return this;
  }
}
