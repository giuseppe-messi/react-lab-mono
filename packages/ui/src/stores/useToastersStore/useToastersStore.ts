import { create } from "zustand";
import { generateUUID } from "../../helpers/generateUUID/generateUUID";

export type ToastType = "sucess" | "error" | "warning";

export type IToast = {
  id: string;
  type: ToastType;
  text: string;
};

type StateProps = {
  toastQueue: IToast[];
  enQueueToast: (type: ToastType, text: string) => void;
  deQueueToast: (id: string) => void;
};

export const useToastersStore = create<StateProps>()((set) => ({
  toastQueue: [],
  enQueueToast: (type: ToastType, text: string) => {
    set((state) => ({
      toastQueue: [{ id: generateUUID(), type, text }, ...state.toastQueue]
    }));
  },
  deQueueToast: (id: string) => {
    set((state) => ({
      toastQueue: state.toastQueue.filter((t) => t.id !== id)
    }));
  }
}));
