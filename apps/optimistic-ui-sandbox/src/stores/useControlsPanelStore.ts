import { generateUUID } from "@react-lab-mono/ui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const CATEGORY_STORE_KEY = "category-storage";

export type CategoryOption = "todos" | "notes" | "bookmarks" | "contacts";

type Category = {
  id: string;
  label: CategoryOption;
  value: CategoryOption;
  disabled: boolean;
};

type Delay = {
  id: LatencyDelay;
  value: LatencyDelay;
  label: string;
};

export const categoryOptions: Category[] = [
  { id: generateUUID(), label: "todos", value: "todos", disabled: false },
  { id: generateUUID(), label: "notes", value: "notes", disabled: false },
  {
    id: generateUUID(),
    label: "bookmarks",
    value: "bookmarks",
    disabled: true
  },
  {
    id: generateUUID(),
    label: "contacts",
    value: "contacts",
    disabled: true
  }
];

export const delayOptions: Delay[] = [
  { id: "500", value: "500", label: "500ms" },
  { id: "1000", value: "1000", label: "1sec" },
  { id: "2000", value: "2000", label: "2sec" },
  { id: "3000", value: "3000", label: "3sec" },
  { id: "random", value: "random", label: "random" }
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
      setCategory: (newCategory) => {
        set({ category: newCategory });
      },
      setMockLatency: (value) => {
        set({ mockLatency: value });
      },
      toggleMockError: () => {
        set((state) => ({ ...state, mockError: !state.mockError }));
      },
      resetSimulations: () => {
        set({ mockError: false, mockLatency: null });
      }
    }),
    {
      name: CATEGORY_STORE_KEY
    }
  )
);
