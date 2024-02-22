import { ChangeEventHandler, MouseEventHandler } from 'react';

import { SortingOrder } from '../data/ItemsSorter';

export interface ActionsProps {
  sortingOrder: SortingOrder;
  onChangeOfSortingOrder: (sortingOrder: SortingOrder) => void;
  onDeleteAllItems: () => void;
}

export function Actions({
  sortingOrder,
  onChangeOfSortingOrder,
  onDeleteAllItems,
}: ActionsProps): JSX.Element {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChangeOfSortingOrder(e.target.value as SortingOrder);
  };

  const handleClickToDeleteAllItems: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const isConfirmed = window.confirm(
      'Are you sure that you want to clear the list?'
    );
    if (isConfirmed) onDeleteAllItems();
  };

  return (
    <div className="actions">
      <select
        name="sorting-order"
        aria-label="sorting order"
        onChange={handleChange}
        value={sortingOrder}
      >
        <option value={SortingOrder.InputDate}>Sort by input order</option>
        <option value={SortingOrder.Description}>Sort by description</option>
        <option value={SortingOrder.IsPacked}>Sort by packed status</option>
      </select>

      <button onClick={handleClickToDeleteAllItems}>Clear List</button>
    </div>
  );
}
