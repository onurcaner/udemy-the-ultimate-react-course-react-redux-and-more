import { useEffect, useState } from 'react';

interface UseGetWatchOptions<T, P> {
  customGet: (getParameter: P, requestInit?: RequestInit) => Promise<T>;
  initialState: T;
  getParameter: P;
}

export function useGetWatch<T, P>({
  customGet,
  initialState,
  getParameter,
}: UseGetWatchOptions<T, P>): [T, boolean, Error | null] {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!getParameter) return;
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);
    customGet(getParameter, { signal: abortController.signal })
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
  }, [customGet, getParameter]);

  return [data, isLoading, error];
}
