import type { ThemeTokens } from "@atlaskit/adapter-contracts";

export const defaultThemeTokens = {
  border: {
    muted: "border-slate-200"
  },
  color: {
    accent: "text-sky-600",
    danger: "text-rose-600",
    muted: "text-slate-500",
    strong: "text-slate-900"
  },
  surface: {
    card: "bg-white",
    subtle: "bg-slate-50"
  }
} satisfies ThemeTokens;
