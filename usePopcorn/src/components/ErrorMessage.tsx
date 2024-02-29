export interface ErrorMessageProps {
  error: unknown;
}

export function ErrorMessage({ error }: ErrorMessageProps): JSX.Element {
  const message =
    error instanceof Error ? error.message : 'Something went wrong';
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
