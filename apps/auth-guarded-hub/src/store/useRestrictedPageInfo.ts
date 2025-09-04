import type { AxiosError } from "axios";
import axios from "axios";
import { create } from "zustand";

export type Block = {
  id: string;
  section: string;
  payload: { text: string; heading: string };
  minTier: number;
};
type Slots = Record<string, Block[]>;

type PagePayload = { slug: string; slots: Slots };

type StateProps = {
  content: PagePayload | null;
  isLoading: boolean;
  error: AxiosError | null;
  setContent: (slug: string) => void;
  clearContent: () => void;
};

export const useRestrictedPageInfo = create<StateProps>()((set, get) => ({
  content: null,
  isLoading: false,
  error: null,
  setContent: (slug: string) => {
    set({
      isLoading: true,
      error: null
    });

    void (async () => {
      try {
        const payload = await axios.get<PagePayload>(
          "/api/restrictedPageInfo",
          {
            params: { slug }
          }
        );
        const data = payload.data;
        set({
          content: data,
          isLoading: false,
          error: null
        });
      } catch (error: unknown) {
        set({
          isLoading: false,
          error: error as AxiosError
        });
      }
    })();
  },
  clearContent: () => {
    set({
      content: null
    });
  }
}));
