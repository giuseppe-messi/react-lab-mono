import { create } from "zustand";
import { persist } from "zustand/middleware";

const CATEGORY_STORE_KEY = "category-storage";

export const CATEGORY_OPTIONS = [
  "todos",
  "notes",
  "bookmarks",
  "contacts"
] as const;

// TODOS: understand this and add it to the ts personal doc
export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

export type LatencyDelay = "500" | "1000" | "2000" | "3000" | "random";
export const defaultLatency: LatencyDelay = "2000";

type StateProps = {
  category: CategoryOption;
  mockLatency: LatencyDelay | null;
  mockError: boolean;
  setCategory: (newCategory: CategoryOption) => void;
  setMockLatency: (value: LatencyDelay | null) => void;
  toggleMockError: () => void;
  resetSimulations: () => void;
};

export const useControlsPanelStore = create<StateProps>()(
  persist(
    (set) => ({
      category: "todos",
      mockLatency: null,
      mockError: false,
      setCategory: (newCategory) => set({ category: newCategory }),
      setMockLatency: (value) => {
        console.log(typeof value);
        set({ mockLatency: value });
      },
      // set({mockLatency: !get().mockLatency })
      toggleMockError: () =>
        set((state) => ({ ...state, mockError: !state.mockError })),
      resetSimulations: () => set({ mockError: false, mockLatency: null })
    }),
    {
      name: CATEGORY_STORE_KEY
    }
  )
);
