import { MovieAttributesType } from '../movie-api/MovieAttributesType';

import { MovieItem } from './MovieItem';

export interface MovieListProps<T extends MovieAttributesType> {
  movies: T[];
  selectedMovieId: string;
  onSelectMovie: (id: string) => void;
  onDeleteWatchedMovie?: (id: string) => void;
}

export function MovieList<T extends MovieAttributesType>({
  movies,
  selectedMovieId,
  onSelectMovie,
  onDeleteWatchedMovie,
}: MovieListProps<T>): JSX.Element {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieItem
          key={movie.imdbId}
          movie={movie}
          selectedMovieId={selectedMovieId}
          onSelectMovie={onSelectMovie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
