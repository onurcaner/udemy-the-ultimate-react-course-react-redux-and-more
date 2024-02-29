import { ChangeEventHandler } from 'react';

export interface SearchProps {
  placeholder: string;
  query: string;
  onChange: (value: string) => void;
}

export function Search({
  placeholder,
  onChange,
  query,
}: SearchProps): JSX.Element {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
    />
  );
}
