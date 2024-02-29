import { SearchMovieAttributes } from './searchMovies';
import { MovieAttributes } from './getMovieById';
import { WatchedMovieAttributes } from './getWatchedMovie';

export type MovieAttributesType =
  | SearchMovieAttributes
  | MovieAttributes
  | WatchedMovieAttributes;
