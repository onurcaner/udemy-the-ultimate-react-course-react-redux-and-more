import { CityAttributes } from './types';

export async function getCities(): Promise<CityAttributes[]> {
  const response = await fetch('http://localhost:5174/cities');
  if (!response.ok) throw new Error();

  const data = (await response.json()) as CityAttributes[];
  return data;
}
