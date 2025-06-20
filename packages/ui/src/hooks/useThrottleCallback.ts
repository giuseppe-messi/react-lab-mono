import { useCallback, useRef } from "react";

export const useThrottleCallback = (fn: () => void, limit: number) => {
  const lastCall = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastCall.current >= limit) {
      lastCall.current = now;
      fn();
    }
  }, [fn, limit]);
};
