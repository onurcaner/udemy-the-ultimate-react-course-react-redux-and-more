import { useState } from 'react';

import { SearchMovieAttributes } from './movie-api/searchMovies';
import {
  WatchedMovieAttributes,
  getWatchedMovie,
} from './movie-api/getWatchedMovie';

import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Search } from './components/Search';
import { ResultsSummary } from './components/ResultsSummary';

import { Main } from './components/Main';
import { ListBox } from './components/ListBox';
import { MovieList } from './components/MovieList';
import { WatchedMoviesSummary } from './components/WatchedMoviesSummary';
import { MovieDetails } from './components/MovieDetails';

import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';

import { searchMovies } from './movie-api/searchMovies';
import { getWatchedMovies } from './movie-api/getWatchedMovies';
import { changeWatchedMovie } from './movie-api/changeWatchedMovie';
import { addWatchedMovie } from './movie-api/addWatchedMovie';
import { deleteWatchedMovie } from './movie-api/deleteWatchedMovie';
import { useFetch } from './hooks/useFetch';

export function App(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [watchedMovies, setWatchedMovies] =
    useState<WatchedMovieAttributes[]>(getWatchedMovies);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [searchedMovies, isSearching, searchError] = useFetch<
    SearchMovieAttributes[]
  >({ customFetch: searchMovies, initialValue: [], query: searchQuery });

  const hasSearchError = Boolean(searchError);
  const isMovieSelected = Boolean(selectedMovieId);

  const handleChangeOfSearch = (value: string): void => {
    setSearchQuery(value);
  };

  const handleSelectMovie = (id: string): void => {
    setSelectedMovieId((selectedId) => (id === selectedId ? '' : id));
  };

  const handleUnselectMovie = (): void => {
    setSelectedMovieId('');
  };

  const handleRateMovie = (watchedMovie: WatchedMovieAttributes): void => {
    if (getWatchedMovie(watchedMovie.imdbId)) {
      changeWatchedMovie(watchedMovie);
    } else {
      addWatchedMovie(watchedMovie);
    }

    setWatchedMovies(getWatchedMovies());
  };

  const handleDeleteWatchedMovie = (id: string): void => {
    deleteWatchedMovie(id);
    setWatchedMovies(getWatchedMovies());
  };

  return (
    <>
      <Header>
        <Logo />
        <Search
          ariaLabel="Search movies"
          placeholder="Search movies..."
          query={searchQuery}
          onChange={handleChangeOfSearch}
        />
        <ResultsSummary items={searchedMovies} />
      </Header>
      <Main>
        <ListBox>
          {isSearching && <Loader />}
          {hasSearchError && <ErrorMessage error={searchError} />}
          {!isSearching && !hasSearchError && (
            <MovieList
              movies={searchedMovies}
              selectedMovieId={selectedMovieId}
              onSelectMovie={handleSelectMovie}
            />
          )}
        </ListBox>
        <ListBox>
          {isMovieSelected && (
            <MovieDetails
              imdbId={selectedMovieId}
              onCloseMovieDetails={handleUnselectMovie}
              onRateMovie={handleRateMovie}
            />
          )}
          {!isMovieSelected && (
            <>
              <WatchedMoviesSummary watchedMovies={watchedMovies} />
              <MovieList
                movies={watchedMovies}
                selectedMovieId={selectedMovieId}
                onSelectMovie={handleSelectMovie}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
