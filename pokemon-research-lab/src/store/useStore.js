import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  page: 1, // current page
  pageSize: 20,
  totalCount: 0,
  columnsMeta: [],

  setData: (d) => set({ data: d }),
  setPage: (p) => set({ page: p }),
  setTotalCount: (c) => set({ totalCount: c }),

  updateRow: (index, patch) =>
    set((state) => {
      const copy = [...state.data];
      copy[index] = { ...copy[index], ...patch };
      return { data: copy };
    }),

  bulkUpdate: (filterFn, updater) =>
    set((state) => {
      const copy = state.data.map((row, i) =>
        filterFn(row, i) ? updater(row, i) : row
      );
      return { data: copy };
    }),

  addColumn: (col) =>
    set((state) => {
      const { id, defaultValue } = col;
      const updatedData = state.data.map((r) => ({ ...r, [id]: defaultValue }));
      return { data: updatedData, columnsMeta: [...state.columnsMeta, col] };
    }),

  reset: () => set({ data: [], columnsMeta: [], page: 1 }),
}));

export default useStore;
