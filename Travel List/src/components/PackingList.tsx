import { ItemAttributes } from '../ItemData';

import { Item } from './Item';

export interface PackingListProps {
  items: ItemAttributes[];
  handleDeleteItem: (id: number) => void;
  handleToggleIsPackedOfItem: (id: number) => void;
}

export function PackingList({
  items,
  handleToggleIsPackedOfItem,
  handleDeleteItem,
}: PackingListProps) {
  const renderItem = (itemAttributes: ItemAttributes): JSX.Element => (
    <li key={itemAttributes.id}>
      <Item
        itemAttributes={itemAttributes}
        onDelete={handleDeleteItem}
        onToggleIsPacked={handleToggleIsPackedOfItem}
      />
    </li>
  );
  return (
    <section className="list">
      <ul>{items.map(renderItem)}</ul>
    </section>
  );
}
