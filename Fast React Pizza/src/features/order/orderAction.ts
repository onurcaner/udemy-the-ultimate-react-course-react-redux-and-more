import { ActionFunction } from 'react-router-dom';

import { updateOrder } from '../../services/restaurant/updateOrder';

export const orderAction: ActionFunction = async ({
  params,
  request,
}): Promise<null> => {
  const { id } = params;
  if (!id) throw new Error('params does not have id field');

  try {
    await updateOrder(id, { priority: true }, { signal: request.signal });
  } catch (error) {
    /* Response from API throws error when .json method is called on it */
    if (!(error instanceof Error)) return null;
    if (error.name !== 'SyntaxError') throw error;
  }
  return null;
};
