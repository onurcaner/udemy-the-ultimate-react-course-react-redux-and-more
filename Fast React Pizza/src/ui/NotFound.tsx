import { MouseEventHandler } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export function NotFound(): JSX.Element {
  const navigate = useNavigate();
  const error = useRouteError() as Error | Record<'data', string>;

  const message = 'data' in error ? error.data : error.message;

  const handleCLick: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <button onClick={handleCLick}>&larr; Go back</button>
    </div>
  );
}
