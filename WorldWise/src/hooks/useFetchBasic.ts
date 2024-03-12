import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseFetchBasicOptions<T> {
  customFetch: (requestInit?: RequestInit) => Promise<T>;
  initialState: T;
}

export function useFetchBasic<T>({
  customFetch,
  initialState,
}: UseFetchBasicOptions<T>): [
  T,
  boolean,
  Error | null,
  Dispatch<SetStateAction<number>>,
] {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);
    customFetch({ signal: abortController.signal })
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
  }, [customFetch, trigger]);

  return [data, isLoading, error, setTrigger];
}
