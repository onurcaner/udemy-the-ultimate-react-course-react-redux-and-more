import { BASE_URL } from './config';
import { getGeneric } from './getGeneric';
import { CityAttributes } from './types';

export async function getCities(
  requestInit?: RequestInit
): Promise<CityAttributes[]> {
  return await getGeneric<CityAttributes[]>(`${BASE_URL}/cities`, requestInit);
}
