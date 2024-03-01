import { ChangeEventHandler } from 'react';

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
    />
  );
}
