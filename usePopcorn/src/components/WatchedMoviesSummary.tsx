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
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{averageImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{averageUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{totalRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
