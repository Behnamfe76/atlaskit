import {
  normalizeClassValue,
  type ClassMap,
  type ClassMapNode,
  type ThemeTokenNode,
  type ThemeTokens
} from "@atlaskit/adapter-contracts";

function resolveNode(
  source: ClassMap | ThemeTokens | undefined,
  path: readonly string[]
): ClassMapNode | ThemeTokenNode | undefined {
  let current:
    | ClassMapNode
    | ThemeTokenNode
    | ClassMap
    | ThemeTokens
    | undefined = source;

  for (const segment of path) {
    if (
      typeof current !== "object" ||
      current === null ||
      Array.isArray(current)
    ) {
      return undefined;
    }

    current = (
      current as Record<string, ClassMapNode | ThemeTokenNode | undefined>
    )[segment];
  }

  return current;
}

export function classNameFor(
  classMap: ClassMap,
  path: readonly string[],
  ...values: readonly (string | false | null | undefined)[]
): string {
  const node = resolveNode(classMap, path);

  return normalizeClassValue(
    typeof node === "string" || Array.isArray(node)
      ? (node as never)
      : undefined,
    ...values
  );
}

export function themeTokenFor(
  theme: ThemeTokens,
  path: readonly string[],
  fallback?: string
): string {
  const node = resolveNode(theme, path);

  return typeof node === "string" ? node : (fallback ?? "");
}
