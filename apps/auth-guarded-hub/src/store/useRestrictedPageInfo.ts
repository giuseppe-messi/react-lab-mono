import type { AxiosError } from "axios";
import axios from "axios";
import { create } from "zustand";
import { useGetApi } from "../hooks/useGetApi";
import { ROUTE } from "../api/routes";

export type Block = {
  id: string;
  section: string;
  payload: { text: string; heading: string };
  plan: number;
};
type Slots = Record<string, Block[]>;

export type PagePayload = { slug: string; slots: Slots };

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

    const { data, isLoading, error } = useGetApi<PagePayload>({
      url: ROUTE.restrictedPageInfo,
      params: { slug },
      onSuccess: () => {
        set({
          isLoading: true,
          error: null
        });
      }
    });
  },
  clearContent: () => {
    set({
      content: null
    });
  }
}));

// import type { AxiosError } from "axios";
// import axios from "axios";
// import { create } from "zustand";

// export type Block = {
//   id: string;
//   section: string;
//   payload: { text: string; heading: string };
//   plan: number;
// };
// type Slots = Record<string, Block[]>;

// export type PagePayload = { slug: string; slots: Slots };

// type StateProps = {
//   content: PagePayload | null;
//   isLoading: boolean;
//   error: AxiosError | null;
//   setContent: (slug: string) => void;
//   clearContent: () => void;
// };

// export const useRestrictedPageInfo = create<StateProps>()((set, get) => ({
//   content: null,
//   isLoading: false,
//   error: null,
//   setContent: (slug: string) => {
//     set({
//       isLoading: true,
//       error: null
//     });

//     void (async () => {
//       try {
//         const payload = await axios.get<PagePayload>(
//           "/api/restrictedPageInfo",
//           {
//             params: { slug }
//           }
//         );
//         const data = payload.data;
//         set({
//           content: data,
//           isLoading: false,
//           error: null
//         });
//       } catch (error: unknown) {
//         set({
//           isLoading: false,
//           error: error as AxiosError
//         });
//       }
//     })();
//   },
//   clearContent: () => {
//     set({
//       content: null
//     });
//   }
// }));
