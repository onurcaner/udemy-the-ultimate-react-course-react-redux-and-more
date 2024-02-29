import { searchMovies } from './searchMovies';
import { getMovie } from './getMovie';

export const omdbapi = {
  searchMovies,
  ...getMovie,
};
