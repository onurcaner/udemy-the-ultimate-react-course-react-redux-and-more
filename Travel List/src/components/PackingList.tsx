import { useState } from 'react';

import { ItemAttributes } from '../data/ItemData';
import {
  SortingOrder,
  sorterByDescription,
  sorterByInputDate,
  sorterByIsPacked,
} from '../data/ItemsSorter';

import { Actions } from './Actions';
import { Item } from './Item';

export interface PackingListProps {
  items: ItemAttributes[];
  onDeleteItem: (id: number) => void;
  onDeleteAllItems: () => void;
  onToggleIsPackedOfItem: (id: number) => void;
}

export function PackingList({
  items,
  onToggleIsPackedOfItem,
  onDeleteItem,
  onDeleteAllItems,
}: PackingListProps): JSX.Element {
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>(
    SortingOrder.InputDate
  );

  const handleChangeOfSortingOrder = (sortingOrder: SortingOrder): void => {
    setSortingOrder(sortingOrder);
  };

  let sortedItems = items;
  if (sortingOrder === SortingOrder.InputDate)
    sortedItems = items.slice().sort(sorterByInputDate);
  if (sortingOrder === SortingOrder.Description)
    sortedItems = items.slice().sort(sorterByDescription);
  if (sortingOrder === SortingOrder.IsPacked)
    sortedItems = items.slice().sort(sorterByIsPacked);

  const renderItem = (itemAttributes: ItemAttributes): JSX.Element => (
    <li key={itemAttributes.id}>
      <Item
        itemAttributes={itemAttributes}
        onDelete={onDeleteItem}
        onToggleIsPacked={onToggleIsPackedOfItem}
      />
    </li>
  );

  return (
    <section className="list">
      <ul>{sortedItems.map(renderItem)}</ul>

      <Actions
        sortingOrder={sortingOrder}
        onChangeOfSortingOrder={handleChangeOfSortingOrder}
        onDeleteAllItems={onDeleteAllItems}
      />
    </section>
  );
}
