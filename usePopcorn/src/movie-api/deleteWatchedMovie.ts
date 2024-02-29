import { getWatchedMovies } from './getWatchedMovies';
import { setWatchedMovies } from './setWatchedMovies';

export function deleteWatchedMovie(id: string): void {
  const watchedMovies = getWatchedMovies().filter(
    ({ imdbId }) => imdbId !== id
  );
  setWatchedMovies(watchedMovies);
}
