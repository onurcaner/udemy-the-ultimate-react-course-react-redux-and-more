import { useEffect, useRef } from 'react';

export function useRefOnClickOutside<T extends HTMLElement>({
  onClickOutside,
}: {
  onClickOutside: () => void;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!e.target) return;
      if (document.querySelector('#portal-target')?.contains(e.target as Node))
        return;
      if (!ref.current.contains(e.target as Node)) onClickOutside();
    };
    const options = { capture: true };

    document.body.addEventListener('click', handleClick, options);

    return () => {
      document.body.removeEventListener('click', handleClick, options);
    };
  }, [ref, onClickOutside]);

  return ref;
}
