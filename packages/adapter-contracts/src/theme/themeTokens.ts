export type ThemeTokenNode = string | ThemeTokens;

export interface ThemeTokens {
  readonly [key: string]: ThemeTokenNode;
}
