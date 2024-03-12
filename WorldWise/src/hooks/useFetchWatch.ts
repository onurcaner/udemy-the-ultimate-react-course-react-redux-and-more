import { useEffect, useState } from 'react';

interface UseFetchWatchOptions<T, P> {
  customFetch: (fetchParameter: P, requestInit?: RequestInit) => Promise<T>;
  initialState: T;
  fetchParameter: P | null;
}

export function useFetchWatch<T, P>({
  customFetch,
  initialState,
  fetchParameter,
}: UseFetchWatchOptions<T, P>): [T, boolean, Error | null] {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!fetchParameter) return;
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);
    customFetch(fetchParameter, { signal: abortController.signal })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') return;
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [customFetch, fetchParameter]);

  return [data, isLoading, error];
}
