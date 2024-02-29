import { WatchedMovieAttributes } from './getWatchedMovie';
import { getWatchedMovies } from './getWatchedMovies';
import { setWatchedMovies } from './setWatchedMovies';

export function addWatchedMovie(watchedMovie: WatchedMovieAttributes): void {
  setWatchedMovies([...getWatchedMovies(), watchedMovie]);
}
