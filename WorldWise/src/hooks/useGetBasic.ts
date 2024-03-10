import { useEffect, useState } from 'react';

interface UseGetBasicOptions<T> {
  customGet: (requestInit?: RequestInit) => Promise<T>;
  initialState: T;
}

export function useGetBasic<T>({
  customGet,
  initialState,
}: UseGetBasicOptions<T>): [T, boolean, Error | null] {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);
    customGet({ signal: abortController.signal })
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
  }, [customGet]);

  return [data, isLoading, error];
}
