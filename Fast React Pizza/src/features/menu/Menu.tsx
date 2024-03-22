import { useLoaderData } from 'react-router-dom';

import { MenuItemAttributes } from '../../services/restaurant/types';
import { MenuItem } from './MenuItem';

export function Menu(): JSX.Element {
  const menu = useLoaderData() as MenuItemAttributes[];

  return (
    <ul className="grid grid-cols-1 gap-x-10 divide-y divide-stone-200 py-2 lg:grid-cols-2">
      {menu.map((menuItem) => (
        <MenuItem menuItem={menuItem} key={menuItem.id} />
      ))}
    </ul>
  );
}
