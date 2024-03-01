import { MouseEventHandler } from 'react';

import { MovieAttributes } from '../movie-api/getMovieById';
import { SearchMovieAttributes } from '../movie-api/searchMovies';
import { WatchedMovieAttributes } from '../movie-api/getWatchedMovie';
import { MovieAttributesType } from '../movie-api/MovieAttributesType';

export interface MovieItemProps<T extends MovieAttributesType> {
  movie: T;
  onSelectMovie?: (id: string) => void;
  onDeleteWatchedMovie?: (id: string) => void;
}

export function MovieItem({
  movie,
  onSelectMovie,
  onDeleteWatchedMovie,
}: MovieItemProps<MovieAttributesType>): JSX.Element {
  const { imdbId, title } = movie;

  const handleClickMovieItem: MouseEventHandler<HTMLLIElement> = () => {
    onSelectMovie?.(imdbId);
  };

  return (
    <li
      role="button"
      onClick={handleClickMovieItem}
      aria-label={`See details of ${title}`}
    >
      <CommonForAll movie={movie} />

      {!('userRating' in movie) && (
        <UniqueForSearchedMovie movie={movie}></UniqueForSearchedMovie>
      )}

      {'userRating' in movie && (
        <UniqueForWatchedMovie
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        ></UniqueForWatchedMovie>
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
  onDeleteWatchedMovie,
}: MovieItemProps<WatchedMovieAttributes>): JSX.Element {
  const { imdbRating, runtime, userRating, title, imdbId } = movie;

  const handleClickDeleteWatchedMovie: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation(); // Prevents selecting movie again
    onDeleteWatchedMovie?.(imdbId);
  };

  return (
    <div>
      <p aria-label={`IMDb rating of ${title}`}>
        <span>⭐️</span>
        <span>{imdbRating.toFixed(1)}</span>
      </p>
      <p aria-label={`User rating of ${title}`}>
        <span>🌟</span>
        <span>{userRating.toFixed(1)}</span>
      </p>
      <p aria-label={`Runtime of ${title}`}>
        <span>⏳</span>
        <span>{runtime} minutes</span>
      </p>
      <button
        className="btn-delete"
        onClick={handleClickDeleteWatchedMovie}
        aria-label={`Delete ${title} from list.`}
      >
        X
      </button>
    </div>
  );
}
