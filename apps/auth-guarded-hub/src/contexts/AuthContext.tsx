import { createContext, useContext, useState, type ReactNode } from "react";
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

type SetAuthActions = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<User | null>(null);
const AuthSetContext = createContext<SetAuthActions | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { refresh } = useFetch<User>({
    url: ROUTES.VERIFY_ME as RouteKey,
    onSuccess: setUser
  });

  return (
    <AuthContext value={user}>
      <AuthSetContext value={{ setUser, refresh }}>{children}</AuthSetContext>
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useSetAuthContext = () => useContext(AuthSetContext);
