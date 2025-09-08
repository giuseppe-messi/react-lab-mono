import axios, { isCancel, type AxiosError } from "axios";
import { useCallback, useRef, useState } from "react";
import type { RouteKey } from "../api/routes";

export const usePost = <T>({
  url,
  onSuccess
}: {
  url: RouteKey;
  onSuccess?: (data: T) => void;
}) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (body: T) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        throw new Error("error");
        const res = await axios.post<T>(url, body, {
          signal: controller.signal
        });

        if (controller.signal.aborted) return;
        setData(res.data);
        onSuccess && onSuccess(res.data);
      } catch (err) {
        if (isCancel(err) || controller.signal.aborted) return;
        setError(err as AxiosError);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    },
    [url, onSuccess]
  );

  return {
    mutate,
    data,
    isLoading,
    error
  };
};
