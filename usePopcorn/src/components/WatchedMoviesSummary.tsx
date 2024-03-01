import { calculateAverage } from '../utils/calculateAverage';

import { WatchedMovieAttributes } from '../movie-api/getWatchedMovie';

export interface WatchedMoviesSummaryProps {
  watchedMovies: WatchedMovieAttributes[];
}

export function WatchedMoviesSummary({
  watchedMovies,
}: WatchedMoviesSummaryProps): JSX.Element {
  const averageImdbRating = calculateAverage(
    ...watchedMovies.map(({ imdbRating }) => imdbRating)
  );
  const averageUserRating = calculateAverage(
    ...watchedMovies.map(({ userRating }) => userRating)
  );
  const totalRuntime = watchedMovies.reduce(
    (total, { runtime }) => total + runtime,
    0
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p aria-label="Number of watched movies">
          <span>#️⃣</span>
          <span>{watchedMovies.length}</span>
        </p>
        <p aria-label="Average IMDb rating of watched movies">
          <span>⭐️</span>
          <span>{averageImdbRating.toFixed(1)}</span>
        </p>
        <p aria-label="Average user rating of watched movies">
          <span>🌟</span>
          <span>{averageUserRating.toFixed(1)}</span>
        </p>
        <p aria-label="Total runtime of watched movies in hours">
          <span>⏳</span>
          <span>{(totalRuntime / 60).toFixed(1)} hours</span>
        </p>
      </div>
    </div>
  );
}
