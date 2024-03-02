import { useState, useEffect, MouseEventHandler } from 'react';

import { MovieAttributes, getMovieById } from '../movie-api/getMovieById';
import {
  WatchedMovieAttributes,
  getWatchedMovie,
} from '../movie-api/getWatchedMovie';

import { StarRating } from './StarRating';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

import { changePageTitle } from '../utils/changePageTitle';
import { useFetch } from '../hooks/useFetch';
import { useKeydown } from '../hooks/useKeydown';

export interface MovieDetailsProps {
  imdbId: string;
  onCloseMovieDetails: () => void;
  onRateMovie: (watchedMovie: WatchedMovieAttributes) => void;
}

export function MovieDetails({
  imdbId,
  onCloseMovieDetails,
  onRateMovie,
}: MovieDetailsProps): JSX.Element {
  const [movie, isLoading, error] = useFetch<MovieAttributes | null>({
    customFetch: getMovieById,
    initialValue: null,
    query: imdbId,
  });
  const [userRating, setUserRating] = useState(0);

  const hasError = Boolean(error);

  // Change page title
  useEffect(() => {
    if (movie) changePageTitle(movie.title);
    return changePageTitle.bind(null);
  }, [movie]);

  // Get rating
  useEffect(() => {
    if (!movie) return;
    if (movie.imdbId !== imdbId) return;

    const watchedMovie = getWatchedMovie(imdbId);
    if (!watchedMovie) return;

    setUserRating(watchedMovie.userRating);
  }, [movie, imdbId]);

  useKeydown({ key: 'Escape', onKeydown: onCloseMovieDetails });

  const handleClickToCloseMovieDetails: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onCloseMovieDetails();
  };

  const handleRate = (newRating: number): void => {
    if (!movie) return;
    const newWatchedMovie: WatchedMovieAttributes = {
      ...movie,
      userRating: newRating,
    };
    onRateMovie(newWatchedMovie);
  };

  return (
    <div className="details">
      {isLoading && <Loader />}
      {hasError && <ErrorMessage error={error} />}
      <header>
        <button
          className="btn-back"
          onClick={handleClickToCloseMovieDetails}
          aria-label="Close movie details"
        >
          &larr;
        </button>
        {!isLoading && !hasError && movie && (
          <>
            <img src={movie.imageUrl} alt={`Poster of ${movie.title}`} />
            <div className="details-overview">
              <h2>{movie.title}</h2>
              <p>
                {movie.released} &bull; {movie.runtime} minutes
              </p>
              <p>{movie.genres.join(', ')}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </>
        )}
      </header>
      {!isLoading && !hasError && movie && (
        <section>
          <div className="rating">
            <StarRating
              onRate={handleRate}
              size={'1.4rem'}
              maxRating={10}
              initialRating={userRating}
            />
          </div>
          <p>
            <em>{movie.plot}</em>
          </p>
          <p>Starring {movie.actors.join(', ')}</p>
          <p>Directed by {movie.director}</p>
        </section>
      )}
    </div>
  );
}
