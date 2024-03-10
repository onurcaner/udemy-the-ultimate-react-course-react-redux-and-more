import { BASE_URL } from './config';
import { getGeneric } from './getGeneric';
import { CityAttributes } from './types';

export async function getCity(
  id: number | string,
  requestInit?: RequestInit
): Promise<CityAttributes> {
  return await getGeneric<CityAttributes>(
    `${BASE_URL}/cities/${id}`,
    requestInit
  );
}
