import { create } from "zustand";
import type { ResourceOption } from "../interfaces";

type StateProps = {
  selected: ResourceOption;
  setOption: (newOption: ResourceOption) => void;
};

export const useResourceStore = create<StateProps>()((set) => ({
  selected: "todos",
  setOption: (newOption) => set({ selected: newOption })
}));
