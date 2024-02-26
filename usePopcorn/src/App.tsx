import { useState } from 'react';

import {
  MovieData,
  WatchedMovieData,
  tempMovieData,
  tempWatchedData,
} from './data/movieData';

import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Search } from './components/Search';
import { ResultsSummary } from './components/ResultsSummary';

import { Main } from './components/Main';
import { ListBox } from './components/ListBox';
import { MovieList } from './components/MovieList';
import { WatchedMoviesSummary } from './components/WatchedMoviesSummary';
import { WatchedMovieList } from './components/WatchedMovieList';

export function App(): JSX.Element {
  const [movies, setMovies] = useState<MovieData[]>(tempMovieData);
  const [watchedMovies, setWatched] =
    useState<WatchedMovieData[]>(tempWatchedData);

  return (
    <>
      <Header>
        <Logo />
        <Search placeholder="Search movies..." />
        <ResultsSummary movies={movies} />
      </Header>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedMoviesSummary watchedMovies={watchedMovies} />
          <WatchedMovieList watchedMovies={watchedMovies} />
        </ListBox>
      </Main>
    </>
  );
}
