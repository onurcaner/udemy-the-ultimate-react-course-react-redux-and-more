import { useState, ChangeEventHandler } from 'react';

export interface SearchProps {
  placeholder: string;
}

export function Search({ placeholder }: SearchProps): JSX.Element {
  const [query, setQuery] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setQuery(value);
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
