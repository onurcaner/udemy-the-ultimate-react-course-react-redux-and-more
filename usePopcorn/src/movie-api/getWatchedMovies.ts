import { WatchedMovieAttributes } from './getWatchedMovie';
import { LOCAL_STORAGE_WATCHED_MOVIES_KEY } from './config';

export function getWatchedMovies(): WatchedMovieAttributes[] {
  const text = window.localStorage.getItem(LOCAL_STORAGE_WATCHED_MOVIES_KEY);
  if (!text) return [];

  return JSON.parse(text) as WatchedMovieAttributes[];
}
