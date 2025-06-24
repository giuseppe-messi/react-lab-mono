import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useDebouncedValue } from "./useDebouncedValue";

interface State<T> {
  items: T[];
  page: number;
  hasMore: boolean;
}

type Action<T> =
  | { type: "RESET" }
  | { type: "APPEND"; payload: T[] }
  | { type: "NO_MORE_TO_FETCH" }
  | { type: "EMPTY_RESULTS" }
  | { type: "INCREMENT_PAGE" };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "RESET":
      return { ...state, page: 1, hasMore: true };
    case "APPEND": {
      const chars = action.payload;
      return {
        items: state.page === 1 ? chars : [...state.items, ...chars],
        page: state.page,
        hasMore: true
      };
    }
    case "NO_MORE_TO_FETCH":
      return { ...state, hasMore: false };
    case "EMPTY_RESULTS":
      return { items: [], page: state.page, hasMore: false };
    case "INCREMENT_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
}

export function useAutoComplete<T>(
  fetcher: (query: string, page: number) => Promise<T[]>,
  rawQuery: string,
  debounceMs = 300
) {
  const debouncedQuery = useDebouncedValue(rawQuery, debounceMs);

  const [state, dispatch] = useReducer(reducer<T>, {
    items: [],
    page: 1,
    hasMore: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const lastItemsRef = useRef<T[]>([]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const results = await fetcher(debouncedQuery, state.page);
        if (results.length === 0) {
          dispatch({
            type: state.page === 1 ? "EMPTY_RESULTS" : "NO_MORE_TO_FETCH"
          });
        } else {
          dispatch({ type: "APPEND", payload: results });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        dispatch({ type: "NO_MORE_TO_FETCH" });
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [fetcher, debouncedQuery, state.page]);

  // reset and stash last items when the debouncedQuery query changes
  useEffect(() => {
    lastItemsRef.current = state.items;
    dispatch({ type: "RESET" });
  }, [debouncedQuery]);

  const loadMore = useCallback(() => {
    if (!isLoading && state.hasMore && !debouncedQuery) {
      dispatch({ type: "INCREMENT_PAGE" });
    }
  }, [isLoading, state.hasMore, debouncedQuery]);

  const reloadLast = useCallback(() => {
    if (lastItemsRef.current.length) {
      dispatch({ type: "RESET" });
      dispatch({ type: "APPEND", payload: lastItemsRef.current });
    }
  }, []);

  return {
    items: state.items,
    isLoading,
    hasMore: state.hasMore,
    loadMore,
    reloadLast
  };
}
