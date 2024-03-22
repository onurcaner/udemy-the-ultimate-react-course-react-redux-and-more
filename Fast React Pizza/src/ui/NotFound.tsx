import { useRouteError } from 'react-router-dom';

import { CustomLink } from './CustomLink';

export function NotFound(): JSX.Element {
  const error = useRouteError() as Error | Record<'data', string>;

  const message = 'data' in error ? error.data : error.message;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <CustomLink to="-1">&larr; Go back</CustomLink>
    </div>
  );
}
