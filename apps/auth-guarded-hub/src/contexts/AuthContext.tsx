import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type SetStateAction
} from "react";
import { useToastersStore } from "@react-lab-mono/ui";
import type { Plan } from "../interfaces/plan";
import { useFetch } from "../hooks/useFetch";
import { ROUTES, type RouteKey } from "../api/routes";

export type User = {
  name: string;
  lastname: string;
  email: string;
  plan: Plan;
  password: string;
};

// type SetAuthActions = {
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   refresh: () => Promise<void>;
//   isLoadingUser: boolean;
// };

type AuthValue = {
  user: User | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refresh: () => Promise<void>;
  isLoadingUser: boolean;
};

const AuthContext = createContext<AuthValue | null>(null);
// const AuthSetContext = createContext<SetAuthActions | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { enQueueToast } = useToastersStore();

  const {
    refresh,
    isLoading: isLoadingUser,
    error
  } = useFetch<User>({
    url: ROUTES.VERIFY_ME as RouteKey,
    onSuccess: useCallback((data: User) => {
      setUser(data);
    }, [])
  });

  const authValue = useMemo(
    () => ({ user, refresh, isLoadingUser }),
    [user, refresh, isLoadingUser]
  );

  // if (error) {
  //   enQueueToast("error", "Something went wrong loading your user!");
  // }

  return <AuthContext value={authValue}>{children}</AuthContext>;

  // return (
  //   <AuthContext value={user}>
  //     <AuthSetContext value={{ setUser, refresh, isLoadingUser }}>
  //       {children}
  //     </AuthSetContext>
  //   </AuthContext>
  // );
};

export const useAuth = () => useContext(AuthContext);

// export const useSetAuthContext = () => useContext(AuthSetContext);
