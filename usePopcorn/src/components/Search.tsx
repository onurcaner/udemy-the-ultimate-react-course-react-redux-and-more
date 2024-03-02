import { useRef, useEffect, ChangeEventHandler } from 'react';
import { useKeydown } from '../hooks/useKeydown';

export interface SearchProps {
  placeholder: string;
  query: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}

export function Search({
  placeholder,
  query,
  ariaLabel,
  onChange,
}: SearchProps): JSX.Element {
  const inputElement = useRef<HTMLInputElement>(null);

  // Focus on mount
  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  // Focus on keydown Enter
  useKeydown({
    key: 'Enter',
    onKeydown() {
      if (document.activeElement === inputElement.current) return;

      inputElement.current?.focus();
      onChange('');
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <input
      className="search"
      type="text"
      aria-label={placeholder}
      placeholder={ariaLabel}
      value={query}
      onChange={handleChange}
      ref={inputElement}
    />
  );
}
