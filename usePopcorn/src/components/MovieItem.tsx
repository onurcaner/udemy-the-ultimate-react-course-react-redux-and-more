import { MovieData, WatchedMovieData } from '../data/movieData';

export interface MovieItemProps<T> {
  movie: T;
}

export function MovieItem({
  movie,
}: MovieItemProps<MovieData | WatchedMovieData>): JSX.Element {
  return (
    <li>
      <CommonForAll movie={movie} />

      {!('runtime' in movie) && <UniqueForMovie movie={movie}></UniqueForMovie>}

      {'runtime' in movie && (
        <UniqueForWatchedMovie movie={movie}></UniqueForWatchedMovie>
      )}
    </li>
  );
}

function CommonForAll({
  movie,
}: MovieItemProps<MovieData | WatchedMovieData>): JSX.Element {
  const { Poster, Title } = movie;
  return (
    <>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
    </>
  );
}

function UniqueForMovie({ movie }: MovieItemProps<MovieData>): JSX.Element {
  const { Year } = movie;
  return (
    <div>
      <p>
        <span>📅</span>
        <span>{Year}</span>
      </p>
    </div>
  );
}

function UniqueForWatchedMovie({
  movie,
}: MovieItemProps<WatchedMovieData>): JSX.Element {
  const { imdbRating, runtime, userRating } = movie;

  return (
    <div>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
    </div>
  );
}
