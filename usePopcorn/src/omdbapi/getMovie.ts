import { API_KEY } from './api-key';
import { omdbFetch, OmdbParametersKeys, OmdbResponseData } from './omdbFetch';

export interface OmdbMovieData extends OmdbResponseData, OmdbMovieAttributes {}

export interface OmdbMovieAttributes {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Title: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
}

export const getMovie = {
  getMovieById,
  getMovieByTitle,
};

async function getMovieById(
  id: string,
  requestInit?: RequestInit
): Promise<OmdbMovieData> {
  return await omdbFetch<OmdbMovieData>(
    [
      [OmdbParametersKeys.ApiKey, API_KEY],
      [OmdbParametersKeys.Id, id],
    ],
    requestInit
  );
}

async function getMovieByTitle(
  title: string,
  requestInit?: RequestInit
): Promise<OmdbMovieData> {
  return await omdbFetch<OmdbMovieData>(
    [
      [OmdbParametersKeys.ApiKey, API_KEY],
      [OmdbParametersKeys.Title, title],
    ],
    requestInit
  );
}
