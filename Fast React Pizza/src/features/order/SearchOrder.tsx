import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ORDER } from '../../pageUrls';

export function SearchOrder(): JSX.Element {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!query) return;

    navigate(`/${ORDER}/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={handleChange}
        className="rounded-full bg-yellow-100 px-4 py-1 text-sm text-stone-700 outline-none transition-all duration-200 placeholder:text-stone-500 focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2 focus:ring-offset-yellow-400 sm:text-base"
      />
    </form>
  );
}
