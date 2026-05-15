export interface ResourceClassLike {
  readonly id?: string;
  readonly name?: string;
  readonly uriKey?: string;
}

export interface ResourceInstanceLike {
  readonly constructor: ResourceClassLike;
}

export type ResourceReference =
  | string
  | ResourceClassLike
  | ResourceInstanceLike;

export interface ResolvedResourceReference {
  readonly identifier: string;
  readonly kind: "class" | "instance" | "uriKey";
  readonly resourceClass: ResourceClassLike;
}

export function isResourceClassLike(
  value: ResourceReference
): value is ResourceClassLike {
  return (
    typeof value === "function" ||
    (typeof value === "object" &&
      value !== null &&
      ("id" in value || "uriKey" in value || "name" in value))
  );
}

export function isResourceInstanceLike(
  value: ResourceReference
): value is ResourceInstanceLike {
  return (
    typeof value === "object" &&
    value !== null &&
    "constructor" in value &&
    typeof value.constructor === "function"
  );
}
