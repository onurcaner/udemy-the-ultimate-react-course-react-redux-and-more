import { ItemAttributes } from '../ItemData';
import { Item } from './Item';

import { initialItems } from '../ItemData';

export function PackingList() {
  const renderItem = (item: ItemAttributes): JSX.Element => (
    <li key={item.id}>
      <Item itemAttributes={item} />
    </li>
  );
  return (
    <section className="list">
      <ul>{initialItems.map(renderItem)}</ul>
    </section>
  );
}
