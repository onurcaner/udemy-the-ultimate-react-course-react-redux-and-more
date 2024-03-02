import { useState, useEffect } from 'react';

export interface UseFetchOptions<T> {
  customFetch: (query: string, requestInit: RequestInit) => Promise<T>;
  query: string;
  initialValue: T | (() => T);
}

export function useFetch<T>({
  customFetch,
  query,
  initialValue,
}: UseFetchOptions<T>): [T, boolean, Error | null] {
  const [result, setResult] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (query.length === 0) {
      return;
    }
    /* if (query.length < 3) {
      setError(null);
      setIsLoading(false);
      return;
    } */

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      setError(null);
      setIsLoading(true);

      customFetch(query, { signal: abortController.signal })
        .then((result) => {
          setResult(result);
          setError(null);
        })
        .catch((searchError: Error) => {
          if (searchError.name === 'AbortError') return;
          setError(searchError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [customFetch, query]);

  return [result, isLoading, error];
}
