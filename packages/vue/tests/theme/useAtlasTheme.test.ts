import { describe, expect, it } from "vitest";

import { createClassMap, mergeThemeTokens, useAtlasTheme } from "../../src";

describe("useAtlasTheme", () => {
  it("merges nested class maps while preserving defaults", () => {
    const classes = createClassMap({
      resourceTable: {
        root: "ring-1 ring-sky-500",
        toolbar: "justify-between"
      }
    });

    expect(classes.resourceTable).toMatchObject({
      root: "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-sky-500",
      toolbar:
        "flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3 justify-between"
    });
  });

  it("merges theme tokens recursively", () => {
    const tokens = mergeThemeTokens(
      {
        color: {
          accent: "text-sky-600",
          muted: "text-slate-500"
        }
      },
      {
        color: {
          accent: "text-emerald-600"
        }
      }
    );

    expect(tokens).toEqual({
      color: {
        accent: "text-emerald-600",
        muted: "text-slate-500"
      }
    });
  });

  it("returns merged class and theme state", () => {
    const result = useAtlasTheme({
      classMap: {
        actionRunner: {
          root: "justify-end"
        }
      },
      theme: {
        color: {
          danger: "text-red-700"
        }
      }
    });

    expect(result.classMap.actionRunner).toMatchObject({
      root: "flex flex-wrap gap-2 justify-end"
    });
    expect(result.theme).toMatchObject({
      color: {
        danger: "text-red-700"
      }
    });
  });
});
