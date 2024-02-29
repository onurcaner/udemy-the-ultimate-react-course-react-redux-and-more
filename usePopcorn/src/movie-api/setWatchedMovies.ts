import { WatchedMovieAttributes } from './getWatchedMovie';
import { LOCAL_STORAGE_WATCHED_MOVIES_KEY } from './config';

export function setWatchedMovies(
  watchedMovies: WatchedMovieAttributes[]
): void {
  const text = JSON.stringify(watchedMovies);
  window.localStorage.setItem(LOCAL_STORAGE_WATCHED_MOVIES_KEY, text);
}
