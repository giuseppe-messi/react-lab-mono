import axios, { isCancel } from "axios";
import { useCallback, useRef, useState } from "react";
import type { RouteKey } from "../api/routes";

type Type = "post" | "put";

type Props = {
  url: RouteKey;
  type: Type;
};

export const useMutate = <T>({ url, type }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const action: Type = type === "post" ? "post" : "put";

  const mutate = useCallback(
    async (
      body: T,
      {
        onSuccess,
        onError
      }: { onSuccess?: (res: T) => void; onError?: (err: unknown) => void } = {}
    ) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);

      try {
        const { data } = await axios[action]<T>(url, body, {
          signal: controller.signal
        });

        if (controller.signal.aborted) return;
        onSuccess && onSuccess(data);
      } catch (err) {
        if (isCancel(err) || controller.signal.aborted) return;
        onError && onError(err);
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
