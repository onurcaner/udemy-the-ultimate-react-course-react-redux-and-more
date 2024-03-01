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
  const [movie, setMovie] = useState<
    MovieAttributes | WatchedMovieAttributes | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const hasError = Boolean(error);

  // Fetch movie details
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const watchedMovie = getWatchedMovie(imdbId);
    if (watchedMovie) {
      setMovie(watchedMovie);
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    getMovieById(imdbId, { signal: abortController.signal })
      .then((movie) => {
        setMovie(movie);
        setError(null);
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') return;
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [imdbId]);

  // Change page title
  useEffect(() => {
    if (movie) changePageTitle(movie.title);
    return changePageTitle.bind(null);
  }, [movie]);

  // Listen 'Escape' key
  useEffect(() => {
    const handleKeydownEscape = ({ code }: KeyboardEvent): void => {
      if (code !== 'Escape') return;

      onCloseMovieDetails();
    };

    document.addEventListener('keydown', handleKeydownEscape);

    return () => {
      document.removeEventListener('keydown', handleKeydownEscape);
    };
  }, [onCloseMovieDetails]);

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
              initialRating={'userRating' in movie ? movie.userRating : 0}
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
