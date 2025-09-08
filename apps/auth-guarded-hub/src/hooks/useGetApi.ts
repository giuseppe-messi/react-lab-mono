import axios, { isCancel, type AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const cache = new Map();

export const useGetApi = <T>({
  url,
  params,
  onSuccess,
  dependsOn
}: {
  url: string;
  params?: unknown;
  onSuccess?: (data: T) => void;
  dependsOn?: unknown[];
}) => {
  console.log("🚀 ~ cache:", cache);
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
      cache.set(JSON.stringify(dependsOn), res.data);
    } catch (err) {
      if (isCancel(err) || controller.signal.aborted) return;
      setError(err as AxiosError);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, [url, onSuccess, params, dependsOn]);

  useEffect(() => {
    if (cache.has(JSON.stringify(dependsOn))) {
      setData(cache.get(JSON.stringify(dependsOn)) as T);
      return () => controllerRef.current?.abort();
    }

    void load();

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [url, load, dependsOn]);

  return {
    data,
    isLoading,
    error,
    refresh: load
  };
};
