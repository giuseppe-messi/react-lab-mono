import axios, { isCancel } from "axios";
import { useCallback, useRef, useState } from "react";
import type { RouteKey } from "../api/routes";

export const usePost = <T>({ url }: { url: RouteKey }) => {
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (
      body: T,
      {
        onSuccess,
        onError
      }: { onSuccess?: () => void; onError?: () => void } = {}
    ) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);

      try {
        await axios.post<T>(url, body, {
          signal: controller.signal
        });

        if (controller.signal.aborted) return;
        onSuccess && onSuccess();
      } catch (err) {
        if (isCancel(err) || controller.signal.aborted) return;
        onError && onError();
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    },
    [url]
  );

  return {
    mutate,
    isLoading
  };
};
