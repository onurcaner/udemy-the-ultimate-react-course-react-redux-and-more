import { API_KEY } from './api-key';
import { omdbFetch, OmdbParametersKeys, OmdbResponseData } from './omdbFetch';

export interface OmdbSearchData extends OmdbResponseData {
  Search: OmdbSearchMovieAttributes[];
  totalResults: number;
}

export interface OmdbSearchMovieAttributes {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export async function searchMovies(keyword: string): Promise<OmdbSearchData> {
  return await omdbFetch<OmdbSearchData>([
    [OmdbParametersKeys.ApiKey, API_KEY],
    [OmdbParametersKeys.Search, keyword],
  ]);
}
