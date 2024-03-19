import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export function CreateUser(): JSX.Element {
  const [username, setUsername] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={handleChange}
        className="w-72"
      />

      {username !== '' && (
        <div>
          <button>Start ordering</button>
        </div>
      )}
    </form>
  );
}
