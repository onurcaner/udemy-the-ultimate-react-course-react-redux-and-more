import { OMDBAPI_URL } from './config';

export enum OmdbParametersKeys {
  ApiKey = 'apikey',
  Id = 'i',
  Title = 't',
  Search = 's',
}

export interface OmdbResponseData {
  Response: 'True' | 'False';
  Error: string;
}

export async function omdbFetch<T extends OmdbResponseData>(
  parameters: [OmdbParametersKeys, string][],
  requestInit?: RequestInit
): Promise<T> {
  const url =
    OMDBAPI_URL +
    '?' +
    parameters.map(([key, value]) => `${key}=${value}`).join('&');

  const response = await fetch(url, requestInit);
  if (!response.ok)
    throw new Error(
      `Error(${response.status}) during fetching data from omdbapi`
    );

  const data = (await response.json()) as T;
  if (data.Response === 'False') throw new Error(data.Error);

  return data;
}
