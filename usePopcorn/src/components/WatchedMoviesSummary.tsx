import { calculateAverage } from '../utils/calculateAverage';

import { WatchedMovieData } from '../data/movieData';

export interface WatchedMoviesSummaryProps {
  watchedMovies: WatchedMovieData[];
}

export function WatchedMoviesSummary({
  watchedMovies,
}: WatchedMoviesSummaryProps): JSX.Element {
  const avgImdbRating = calculateAverage(
    ...watchedMovies.map(({ imdbRating }) => imdbRating)
  );
  const avgUserRating = calculateAverage(
    ...watchedMovies.map(({ userRating }) => userRating)
  );
  const avgRuntime = calculateAverage(
    ...watchedMovies.map(({ runtime }) => runtime)
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
