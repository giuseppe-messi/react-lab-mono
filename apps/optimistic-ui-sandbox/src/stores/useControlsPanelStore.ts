import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

const CATEGORY_STORE_KEY = "category-storage";

export type CategoryOption = "todos" | "notes" | "bookmarks" | "contacts";

type Category = {
  id: string;
  label: CategoryOption;
  disabled: boolean;
};

export const categoryOptions: Category[] = [
  { id: nanoid(), label: "todos", disabled: false },
  { id: nanoid(), label: "notes", disabled: false },
  { id: nanoid(), label: "bookmarks", disabled: true },
  { id: nanoid(), label: "contacts", disabled: true }
];

export type LatencyDelay = "500" | "1000" | "2000" | "3000" | "random";
export const defaultLatency: LatencyDelay = "2000";
export const maxLatencyRandomValue = 5000;

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
      setMockLatency: (value) => set({ mockLatency: value }),
      toggleMockError: () =>
        set((state) => ({ ...state, mockError: !state.mockError })),
      resetSimulations: () => set({ mockError: false, mockLatency: null })
    }),
    {
      name: CATEGORY_STORE_KEY
    }
  )
);
