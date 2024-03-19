import { useLoaderData } from 'react-router-dom';

import { MenuItemAttributes } from '../../services/restaurant/types';
import { MenuItem } from './MenuItem';

export function Menu(): JSX.Element {
  const menuCollection = useLoaderData() as MenuItemAttributes[];
  console.log(menuCollection);
  return (
    <ul>
      {menuCollection.map((menuItem) => (
        <MenuItem menuItem={menuItem} key={menuItem.id} />
      ))}
    </ul>
  );
}
