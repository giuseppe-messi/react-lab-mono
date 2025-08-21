import type { AxiosError } from "axios";
import axios from "axios";
import { useCallback, useState } from "react";

export interface CreateUserInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const useCreateUser = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const createUser = useCallback(async (input: CreateUserInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/users", input);

      setUser(data);
    } catch (err) {
      console.error(err);
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    createUser,
    isLoading,
    error
  };
};
