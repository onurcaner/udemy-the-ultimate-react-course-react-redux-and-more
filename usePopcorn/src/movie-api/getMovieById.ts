import { omdbapi } from '../omdbapi';
import { OmdbMovieAttributes } from '../omdbapi/getMovie';

import { SearchMovieAttributes, mapOmdbSearchMovie } from './searchMovies';

export interface MovieAttributes extends SearchMovieAttributes {
  actors: string[];
  director: string;
  genres: string[];
  plot: string;
  imageUrl: string;
  released: string;
  runtime: number;
  title: string;
  year: number;
  imdbId: string;
  imdbRating: number;
}

export async function getMovieById(id: string): Promise<MovieAttributes> {
  const movie = await omdbapi.getMovieById(id);
  return mapOmdbMovie(movie);
}

function mapOmdbMovie(movie: OmdbMovieAttributes): MovieAttributes {
  return {
    ...mapOmdbSearchMovie(movie),
    actors: movie.Actors.split(', '),
    director: movie.Director,
    genres: movie.Genre.split(', '),
    plot: movie.Plot,
    released: movie.Released,
    runtime: Number.parseInt(movie.Runtime),
    imdbRating: +movie.imdbRating,
  };
}
