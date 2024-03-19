import { API_URL } from './config';
import {
  NewOrderAttributes,
  OrderAttributes,
  RestaurantResponse,
} from './types';

export async function updateOrder(
  id: number | string,
  updateObj: Partial<NewOrderAttributes>,
  requestInit?: RequestInit,
): Promise<OrderAttributes> {
  const response = await fetch(`${API_URL}/order/${id}`, {
    ...requestInit,
    method: 'PATCH',
    body: JSON.stringify(updateObj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw Error('Failed updating your order');

  const data = (await response.json()) as RestaurantResponse<OrderAttributes>;
  if (data.status !== 'success') throw new Error(data.message);

  return data.data;
}
