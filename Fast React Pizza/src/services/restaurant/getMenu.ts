import { API_URL } from './config';
import { MenuItemAttributes, RestaurantResponse } from './types';

export async function getMenu(
  requestInit?: RequestInit,
): Promise<MenuItemAttributes[]> {
  const response = await fetch(`${API_URL}/menu`, requestInit);
  if (!response.ok) throw Error('Failed getting menu');

  const data = (await response.json()) as RestaurantResponse<
    MenuItemAttributes[]
  >;
  if (data.status !== 'success') throw new Error(data.message);

  return data.data;
}
