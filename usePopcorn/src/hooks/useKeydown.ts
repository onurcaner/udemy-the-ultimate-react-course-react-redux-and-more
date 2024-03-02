import { useEffect } from 'react';

export interface UseKeydownOptions {
  key: KeyboardEvent['key'];
  onKeydown: () => void;
}

export function useKeydown({ key, onKeydown }: UseKeydownOptions): void {
  useEffect(() => {
    const handleKeydownEscape = (e: KeyboardEvent): void => {
      if (e.key !== key) return;

      onKeydown();
    };

    document.addEventListener('keydown', handleKeydownEscape);

    return () => {
      document.removeEventListener('keydown', handleKeydownEscape);
    };
  }, [key, onKeydown]);
}
