export type ClassValue = string | readonly string[] | false | null | undefined;
export type ClassMapNode = ClassValue | ClassMap;

export interface ClassMap {
  readonly [key: string]: ClassMapNode;
}

export function normalizeClassValue(...values: readonly ClassValue[]): string {
  return values
    .flatMap((value) => {
      if (!value) {
        return [];
      }

      return Array.isArray(value) ? value : [value];
    })
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" ");
}
