import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

export const useUsersQuery = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      abortRef.current?.abort(); // cancel any in-flight request
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get("/api/users", {
          signal: controller.signal
        });
        setUsers(data);
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") return; // hides the aborted request
        console.error(err);
        setError(err as AxiosError);
      } finally {
        // clears only the active run loading
        if (abortRef.current === controller) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
    users,
    isLoading,
    error
  };
};
