import { MouseEventHandler } from 'react';

import { MovieAttributes } from '../movie-api/getMovieById';
import { SearchMovieAttributes } from '../movie-api/searchMovies';
import { WatchedMovieAttributes } from '../movie-api/getWatchedMovie';
import { MovieAttributesType } from '../movie-api/MovieAttributesType';

export interface MovieItemProps<T extends MovieAttributesType> {
  movie: T;
  onClick?: (id: string) => void;
}

export function MovieItem({
  movie,
  onClick,
}: MovieItemProps<MovieAttributesType>): JSX.Element {
  const { imdbId, title } = movie;

  const handleClick: MouseEventHandler<HTMLLIElement> = () => {
    onClick?.(imdbId);
  };

  return (
    <li
      role="button"
      onClick={handleClick}
      aria-label={`See details of ${title}`}
    >
      <CommonForAll movie={movie} />

      {!('userRating' in movie) && (
        <UniqueForSearchedMovie movie={movie}></UniqueForSearchedMovie>
      )}

      {'userRating' in movie && (
        <UniqueForWatchedMovie movie={movie}></UniqueForWatchedMovie>
      )}
    </li>
  );
}

function CommonForAll({
  movie,
}: MovieItemProps<MovieAttributes | SearchMovieAttributes>): JSX.Element {
  const { imageUrl, title } = movie;
  return (
    <>
      <img src={imageUrl} alt={`${title} poster`} />
      <h3>{title}</h3>
    </>
  );
}

function UniqueForSearchedMovie({
  movie,
}: MovieItemProps<SearchMovieAttributes>): JSX.Element {
  const { year } = movie;
  return (
    <div>
      <p>
        <span>📅</span>
        <span>{year}</span>
      </p>
    </div>
  );
}

function UniqueForWatchedMovie({
  movie,
}: MovieItemProps<WatchedMovieAttributes>): JSX.Element {
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
