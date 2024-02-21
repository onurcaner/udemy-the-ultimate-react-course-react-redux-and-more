import { ChangeEventHandler } from 'react';

import { SortingOrder } from '../data/ItemsSorter';

export interface ActionsProps {
  sortingOrder: SortingOrder;
  onChangeOfSortingOrder: (sortingOrder: SortingOrder) => void;
}

export function Actions({
  sortingOrder,
  onChangeOfSortingOrder,
}: ActionsProps): JSX.Element {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChangeOfSortingOrder(e.target.value as SortingOrder);
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
    </div>
  );
}
