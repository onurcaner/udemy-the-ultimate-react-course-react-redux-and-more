import { omdbapi } from '../omdbapi';
import { OmdbSearchMovieAttributes } from '../omdbapi/searchMovies';

export interface SearchMovieAttributes {
  title: string;
  year: number;
  imageUrl: string;
  imdbId: string;
}

export async function searchMovies(
  keyword: string,
  requestInit?: RequestInit
): Promise<SearchMovieAttributes[]> {
  const { Search: search } = await omdbapi.searchMovies(keyword, requestInit);
  return search.map(mapOmdbSearchMovie);
}

export function mapOmdbSearchMovie(
  movie: OmdbSearchMovieAttributes
): SearchMovieAttributes {
  return {
    imageUrl: movie.Poster,
    imdbId: movie.imdbID,
    title: movie.Title,
    year: +movie.Year,
  };
}
