import { MovieData } from '../data/movieData';

import { MovieItem } from './MovieItem';

export interface MovieListProps {
  movies: MovieData[];
}

export function MovieList({ movies }: MovieListProps): JSX.Element {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
