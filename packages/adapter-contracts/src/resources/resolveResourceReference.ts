import {
  isResourceClassLike,
  isResourceInstanceLike,
  type ResolvedResourceReference,
  type ResourceClassLike,
  type ResourceReference
} from "./resourceReference";

export interface ResourceReferenceResolver {
  byUriKey(uriKey: string): ResourceClassLike;
}

export function resolveResourceReference(
  resource: ResourceReference,
  resolver: ResourceReferenceResolver
): ResolvedResourceReference {
  if (typeof resource === "string") {
    return {
      identifier: resource,
      kind: "uriKey",
      resourceClass: resolver.byUriKey(resource)
    };
  }

  if (isResourceClassLike(resource)) {
    return {
      identifier: resource.uriKey ?? resource.id ?? resource.name ?? "resource",
      kind: "class",
      resourceClass: resource
    };
  }

  if (isResourceInstanceLike(resource)) {
    const resourceClass = resource.constructor;

    return {
      identifier:
        resourceClass.uriKey ??
        resourceClass.id ??
        resourceClass.name ??
        "resource",
      kind: "instance",
      resourceClass
    };
  }

  throw new Error("Unsupported resource reference.");
}
