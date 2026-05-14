import { invariant } from "../support/invariant";

import { normalizeResourcePages } from "./resourcePages";
import type {
  ResourceClass,
  ResourceEndpoints,
  ResourceLabels,
  ResourceMetadata
} from "./resourceTypes";

function defaultLabels(resourceClass: ResourceClass): ResourceLabels {
  const className = resourceClass.name.replace(/Resource$/, "");

  return {
    plural: `${className}s`,
    singular: className
  };
}

function defaultEndpoints(uriKey: string): ResourceEndpoints {
  return {
    collection: `/${uriKey}`,
    item: `/${uriKey}/:id`
  };
}

export function extractResourceMeta(
  resourceClass: ResourceClass
): ResourceMetadata {
  const id = resourceClass.id;
  const uriKey = resourceClass.uriKey;

  invariant(id, `${resourceClass.name} must define a static id.`);
  invariant(uriKey, `${resourceClass.name} must define a static uriKey.`);

  return {
    endpoints: resourceClass.endpoints ?? defaultEndpoints(uriKey),
    id,
    labels: resourceClass.labels ?? defaultLabels(resourceClass),
    name: resourceClass.name,
    pages: normalizeResourcePages(uriKey, resourceClass.pages),
    pagination: resourceClass.pagination ?? "collection",
    searchable: resourceClass.searchable ?? [],
    uriKey
  };
}
