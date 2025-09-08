import axios, { isCancel, type AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RouteKey } from "../api/routes";

const cache = new Map();

export const useFetch = <T>({
  url,
  params,
  onSuccess,
  cacheKey
}: {
  url: RouteKey;
  params?: unknown;
  onSuccess?: (data: T) => void;
  cacheKey?: string;
}) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get<T>(url, {
        params,
        signal: controller.signal
      });
      if (controller.signal.aborted) return;
      setData(res.data);
      onSuccess && onSuccess(res.data);

      if (cacheKey) {
        cache.set(cacheKey, res.data);
      }
    } catch (err) {
      if (isCancel(err) || controller.signal.aborted) return;
      setError(err as AxiosError);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, [url, onSuccess, params, cacheKey]);

  useEffect(() => {
    if (cache.has(cacheKey)) {
      setData(cache.get(cacheKey) as T);
      return () => controllerRef.current?.abort();
    }

    void load();

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [url, load, cacheKey]);

  return {
    data,
    isLoading,
    error,
    refresh: load
  };
};
