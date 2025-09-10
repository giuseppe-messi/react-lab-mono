import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { Plan } from "../interfaces/plan";
import { useFetch } from "../hooks/useFetch";
import { ROUTES, type RouteKey } from "../api/routes";

export type User = {
  name: string;
  lastname: string;
  email: string;
  plan: Plan;
};

type AuthValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refresh: () => Promise<void>;
  isLoadingUser: boolean;
};

const AuthContext = createContext<AuthValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { refresh, isLoading: isLoadingUser } = useFetch<User>({
    url: ROUTES.VERIFY_ME as RouteKey,
    onSuccess: useCallback((data: User) => {
      setUser(data);
    }, [])
  });

  const authValue = useMemo(
    () => ({ user, setUser, refresh, isLoadingUser }),
    [user, refresh, isLoadingUser]
  );

  return <AuthContext value={authValue}>{children}</AuthContext>;
};

export const useAuth = () => useContext(AuthContext);
