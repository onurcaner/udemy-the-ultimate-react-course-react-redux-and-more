import { API_URL } from './config';
import { OrderAttributes, RestaurantResponse } from './types';

export async function getOrder(
  id: number | string,
  requestInit?: RequestInit,
): Promise<OrderAttributes> {
  const response = await fetch(`${API_URL}/order/${id}`, requestInit);
  if (!response.ok) throw Error(`Couldn't find order #${id}`);

  const data = (await response.json()) as RestaurantResponse<OrderAttributes>;
  if (data.status !== 'success') throw new Error(data.message);

  return data.data;
}
