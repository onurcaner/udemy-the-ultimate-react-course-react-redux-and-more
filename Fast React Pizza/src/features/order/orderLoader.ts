import { LoaderFunction } from 'react-router-dom';

import { getOrder } from '../../services/restaurant/getOrder';
import { OrderAttributes } from '../../services/restaurant/types';

export const orderLoader: LoaderFunction = async ({
  params,
  request,
}): Promise<OrderAttributes> => {
  const { id } = params;
  if (!id) throw new Error("'params' does not contain 'id' field");

  const order = await getOrder(id, { signal: request.signal });
  return order;
};
