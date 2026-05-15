import type { ClassMap, ThemeTokens } from "@atlaskit/adapter-contracts";

import { createClassMap, createThemeTokens } from "../theme/createClassMap";

export interface UseAtlasThemeOptions {
  readonly classMap?: ClassMap;
  readonly theme?: ThemeTokens;
}

export interface AtlasThemeContext {
  readonly classMap: ClassMap;
  readonly theme: ThemeTokens;
}

export function useAtlasTheme(
  options: UseAtlasThemeOptions = {}
): AtlasThemeContext {
  return {
    classMap: createClassMap(options.classMap),
    theme: createThemeTokens(options.theme)
  };
}
