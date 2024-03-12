import { BASE_URL } from './config';
import { postGeneric } from './postGeneric';
import { CityAttributes } from './types';

export async function postCity(
  city: Omit<CityAttributes, 'id'>,
  requestInit?: RequestInit,
): Promise<CityAttributes> {
  return await postGeneric(`${BASE_URL}/cities`, city, requestInit);
}
