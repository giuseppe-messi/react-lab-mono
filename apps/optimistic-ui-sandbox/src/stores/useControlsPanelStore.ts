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

type StateProps = {
  category: CategoryOption;
  mockLatency: boolean;
  mockError: boolean;
  setCategory: (newCategory: CategoryOption) => void;
  toggleMockLatency: () => void;
  toggleMockError: () => void;
};

export const useControlsPanelStore = create<StateProps>()(
  persist(
    (set) => ({
      category: "todos",
      mockLatency: false,
      mockError: false,
      setCategory: (newCategory) => set({ category: newCategory }),
      toggleMockLatency: () =>
        set((state) => ({ ...state, mockLatency: !state.mockLatency })),
      // set({mockLatency: !get().mockLatency })
      toggleMockError: () =>
        set((state) => ({ ...state, mockError: !state.mockError }))
    }),
    {
      name: CATEGORY_STORE_KEY
    }
  )
);
