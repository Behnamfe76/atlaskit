import type { ClassMap } from "@atlaskit/adapter-contracts";

export const defaultClasses = {
  actionRunner: {
    disabled: "cursor-not-allowed opacity-60",
    root: "flex flex-wrap gap-2"
  },
  fieldRenderer: {
    error: "text-sm text-rose-600",
    label: "text-sm font-medium text-slate-700",
    root: "flex flex-col gap-1"
  },
  resourceForm: {
    actions: "flex justify-end gap-3",
    root: "space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
  },
  resourceShow: {
    section: "grid gap-4",
    root: "space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
  },
  resourceTable: {
    cell: "px-4 py-3 text-sm text-slate-700",
    empty: "px-6 py-8 text-center text-sm text-slate-500",
    root: "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm",
    row: "border-t border-slate-100",
    table: "min-w-full divide-y divide-slate-200",
    toolbar: "flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3"
  }
} satisfies ClassMap;
