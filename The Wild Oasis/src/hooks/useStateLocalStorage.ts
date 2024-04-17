import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useStateLocalStorage<T>(
  initialState: T,
  localStorageKey: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedJSON = localStorage.getItem(localStorageKey);
      const defaultState = storedJSON
        ? (JSON.parse(storedJSON) as T)
        : initialState;
      return defaultState;
    } catch (_error) {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    } catch (_error) {
      /* empty */
    }
  }, [value, localStorageKey]);

  return [value, setValue];
}
