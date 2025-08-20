import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  email: string;
  password: string;
};

const AuthContext = createContext<User | null>(null);
const AuthDispatchContext = createContext<React.Dispatch<
  React.SetStateAction<User | null>
> | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext value={user}>
      <AuthDispatchContext value={setUser}>{children}</AuthDispatchContext>
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useAuthDispatch = () => useContext(AuthDispatchContext);
