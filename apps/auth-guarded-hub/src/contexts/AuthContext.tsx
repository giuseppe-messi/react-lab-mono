import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import type { Plan } from "../interfaces/tier";

export type User = {
  name: string;
  lastname: string;
  email: string;
  tier: Plan;
  password: string;
};

type AuthSetActions = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refresh: (mounted?: boolean) => void;
};

const AuthContext = createContext<User | null>(null);
const AuthSetContext = createContext<AuthSetActions | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(
    (mounted?: boolean) =>
      void axios
        .get("/api/verifyMe")
        .then((res) => mounted && setUser(res.data))
        .catch(() => mounted && setUser(null))
        .finally(() => mounted && setReady(true)),
    []
  );

  useEffect(() => {
    let mounted = true;

    refresh(mounted);
    return () => {
      mounted = false;
    };
  }, [refresh]);

  if (!ready) return null;

  return (
    <AuthContext value={user}>
      <AuthSetContext value={{ setUser, refresh }}>{children}</AuthSetContext>
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useAuthSetContext = () => useContext(AuthSetContext);
