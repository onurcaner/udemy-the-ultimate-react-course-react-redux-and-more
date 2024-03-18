const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

interface RestaurantResponse<T> {
  status: 'success' | 'fail';
  message: string;
  data: T;
}

export interface MenuItemAttributes {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

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

export async function getOrder(id: number, requestInit?: RequestInit) {
  const response = await fetch(`${API_URL}/order/${id}`, requestInit);
  if (!response.ok) throw Error(`Couldn't find order #${id}`);

  const data = (await response.json()) as RestaurantResponse<string>;
  if (data.status !== 'success') throw new Error(data.message);

  return data;
}

export async function createOrder(newOrder, requestInit?: RequestInit) {
  const response = await fetch(`${API_URL}/order`, {
    ...requestInit,
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw Error('Failed creating your order');

  const data = (await response.json()) as RestaurantResponse<string>;
  if (data.status !== 'success') throw new Error(data.message);

  return data;
}

export async function updateOrder(
  id: number,
  updateObj,
  requestInit?: RequestInit,
) {
  const response = await fetch(`${API_URL}/order/${id}`, {
    ...requestInit,
    method: 'PATCH',
    body: JSON.stringify(updateObj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw Error('Failed updating your order');

  const data = (await response.json()) as RestaurantResponse<string>;
  if (data.status !== 'success') throw new Error(data.message);
}
