import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export interface CreateUserInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const useCreateUser = ({
  name,
  lastname,
  email,
  password
}: CreateUserInput) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const createUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.post("/api/users", {
          name,
          lastname,
          email,
          password
        });

        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    createUser();
  }, [name, lastname, email, password]);

  return {
    user,
    isLoading,
    error
  };
};
