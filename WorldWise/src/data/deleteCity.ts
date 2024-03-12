import { BASE_URL } from './config';
import { deleteGeneric } from './deleteGeneric';
import { CityAttributes } from './types';

export async function deleteCity(
  id: number | string,
  requestInit?: RequestInit,
): Promise<CityAttributes> {
  return await deleteGeneric(`${BASE_URL}/cities/${id}`, requestInit);
}
