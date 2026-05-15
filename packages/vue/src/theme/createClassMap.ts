import {
  normalizeClassValue,
  type ClassMap,
  type ClassMapNode,
  type ThemeTokenNode,
  type ThemeTokens
} from "@atlaskit/adapter-contracts";

import { defaultClasses } from "./defaultClasses";
import { defaultThemeTokens } from "./themeTokens";

function isPlainObject(
  value: ClassMapNode | ThemeTokenNode | undefined
): value is ClassMap | ThemeTokens {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeNodes(base: ClassMapNode, override: ClassMapNode): ClassMapNode {
  if (isPlainObject(base) && isPlainObject(override)) {
    return mergeClassMaps(base as ClassMap, override as ClassMap);
  }

  return normalizeClassValue(base as never, override as never);
}

export function mergeClassMaps(
  base: ClassMap,
  override?: ClassMap
): ClassMap {
  if (!override) {
    return { ...base };
  }

  const merged: Record<string, ClassMapNode> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = merged[key];

    if (current === undefined) {
      merged[key] = value;
      continue;
    }

    merged[key] = mergeNodes(current, value);
  }

  return merged;
}

function mergeThemeNodes(base: ThemeTokenNode, override: ThemeTokenNode): ThemeTokenNode {
  if (isPlainObject(base) && isPlainObject(override)) {
    return mergeThemeTokens(base as ThemeTokens, override as ThemeTokens);
  }

  return (override ?? base) as ThemeTokenNode;
}

export function mergeThemeTokens(
  base: ThemeTokens,
  override?: ThemeTokens
): ThemeTokens {
  if (!override) {
    return { ...base };
  }

  const merged: Record<string, ThemeTokenNode> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = merged[key];

    if (current === undefined) {
      merged[key] = value;
      continue;
    }

    merged[key] = mergeThemeNodes(current, value);
  }

  return merged;
}

export function createClassMap(overrides?: ClassMap): ClassMap {
  return mergeClassMaps(defaultClasses, overrides);
}

export function createThemeTokens(overrides?: ThemeTokens): ThemeTokens {
  return mergeThemeTokens(defaultThemeTokens, overrides);
}
