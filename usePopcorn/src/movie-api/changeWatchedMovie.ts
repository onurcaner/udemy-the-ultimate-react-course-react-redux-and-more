import { WatchedMovieAttributes } from './getWatchedMovie';
import { getWatchedMovies } from './getWatchedMovies';
import { setWatchedMovies } from './setWatchedMovies';

export function changeWatchedMovie(watchedMovie: WatchedMovieAttributes): void {
  const watchedMovies = getWatchedMovies().map((wm) =>
    wm.imdbId === watchedMovie.imdbId ? watchedMovie : wm
  );
  setWatchedMovies(watchedMovies);
}
