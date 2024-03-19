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
      />
    </form>
  );
}
