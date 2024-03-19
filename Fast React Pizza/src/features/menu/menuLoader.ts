import { LoaderFunction } from 'react-router-dom';

import { getMenu } from '../../services/restaurant/getMenu';
import { MenuItemAttributes } from '../../services/restaurant/types';

export const menuLoader: LoaderFunction = async ({
  request,
}): Promise<MenuItemAttributes[]> => {
  const menu = await getMenu({ signal: request.signal });
  return menu;
};
