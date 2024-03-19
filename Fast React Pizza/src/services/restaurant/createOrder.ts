import { API_URL } from './config';
import {
  NewOrderAttributes,
  OrderAttributes,
  RestaurantResponse,
} from './types';

export async function createOrder(
  newOrder: NewOrderAttributes,
  requestInit?: RequestInit,
): Promise<OrderAttributes> {
  const response = await fetch(`${API_URL}/order`, {
    ...requestInit,
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw Error('Failed creating your order');

  const data = (await response.json()) as RestaurantResponse<OrderAttributes>;
  if (data.status !== 'success') throw new Error(data.message);

  return data.data;
}
