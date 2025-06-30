import { create } from "zustand";
import { nanoid } from "nanoid";

type ToastType = "sucess" | "error" | "warning";

export type IToast = {
  id: string;
  type: ToastType;
  text: string;
};

type StateProps = {
  toastQueue: IToast[];
  enQueueToast: (type: ToastType, text: string) => void;
};

export const useToastersStore = create<StateProps>()((set) => ({
  toastQueue: [
    { id: "sdsds", text: "hello", type: "error" },
    { id: "sdsds", text: "ciao", type: "sucess" }
  ],
  enQueueToast: (type: ToastType, text: string) => {
    set((state) => ({
      toastQueue: [{ id: nanoid(), type, text }, ...state.toastQueue]
    }));
  }
}));
