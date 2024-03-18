import { LoaderFunction } from 'react-router-dom';

import { MenuItemAttributes, getMenu } from '../../services/apiRestaurant';

export const menuLoader: LoaderFunction<MenuItemAttributes[]> = async ({
  request,
}) => {
  const menu = await getMenu({ signal: request.signal });
  return menu;
};
