export interface ResultsSummaryProps {
  items: unknown[];
}

export function ResultsSummary({ items }: ResultsSummaryProps): JSX.Element {
  return (
    <p className="num-results">
      Found <strong>{items.length}</strong> results
    </p>
  );
}
