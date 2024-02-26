import { WatchedMovieData } from '../data/movieData';

import { MovieItem } from './MovieItem';

export interface WatchedMovieListProps {
  watchedMovies: WatchedMovieData[];
}

export function WatchedMovieList({
  watchedMovies,
}: WatchedMovieListProps): JSX.Element {
  return (
    <ul className="list">
      {watchedMovies.map((watchedMovie) => (
        <MovieItem movie={watchedMovie} key={watchedMovie.imdbID} />
      ))}
    </ul>
  );
}
