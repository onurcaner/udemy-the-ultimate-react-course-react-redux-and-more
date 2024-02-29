import { MovieAttributes } from './getMovieById';
import { getWatchedMovies } from './getWatchedMovies';

export interface WatchedMovieAttributes extends MovieAttributes {
  userRating: number;
}

export function getWatchedMovie(
  id: string
): WatchedMovieAttributes | undefined {
  return getWatchedMovies().find(({ imdbId }) => imdbId === id);
}
