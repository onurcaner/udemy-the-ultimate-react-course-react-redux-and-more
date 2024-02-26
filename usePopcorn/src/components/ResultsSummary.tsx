import { MovieData } from '../data/movieData';

export interface ResultsSummaryProps {
  movies: MovieData[];
}

export function ResultsSummary({ movies }: ResultsSummaryProps): JSX.Element {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
