import type { ClassMap } from "@atlaskit/adapter-contracts";

export const defaultClasses = {
  actionRunner: {
    button:
      "rounded-md border border-slate-300 px-3 py-2 text-sm font-medium transition",
    disabled: "cursor-not-allowed opacity-60",
    root: "flex flex-wrap gap-2"
  },
  fieldRenderer: {
    error: "text-sm text-rose-600",
    input: "w-full rounded-md border px-3 py-2 text-sm",
    label: "text-sm font-medium text-slate-700",
    list: "flex flex-wrap gap-2",
    root: "flex flex-col gap-1",
    select: "w-full rounded-md border px-3 py-2 text-sm",
    text: "text-sm",
    textarea: "min-h-28 w-full rounded-md border px-3 py-2 text-sm"
  },
  resourceForm: {
    actions: "flex justify-end gap-3",
    root: "space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
    submit:
      "rounded-md border border-slate-300 px-4 py-2 text-sm font-medium transition"
  },
  resourceShow: {
    root: "space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
    section: "grid gap-4"
  },
  resourceTable: {
    cell: "px-4 py-3 text-sm text-slate-700",
    empty: "px-6 py-8 text-center text-sm text-slate-500",
    header: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide",
    root: "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm",
    row: "border-t border-slate-100",
    search: "rounded-md border border-slate-300 px-3 py-2 text-sm",
    table: "min-w-full divide-y divide-slate-200",
    toolbar:
      "flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3"
  }
} satisfies ClassMap;
