import { ChangeEventHandler, MouseEventHandler } from 'react';

import { ItemAttributes } from '../data/ItemData';

interface ItemProps {
  itemAttributes: ItemAttributes;
  onDelete: (id: number) => void;
  onToggleIsPacked: (id: number) => void;
}

export function Item({
  itemAttributes,
  onToggleIsPacked,
  onDelete,
}: ItemProps): JSX.Element {
  const { description, id, isPacked, quantity } = itemAttributes;
  const inputId = `${id}_${description}`;

  const handleChangeIsPacked: ChangeEventHandler<HTMLInputElement> = () => {
    onToggleIsPacked(id);
  };

  const handleClickToDeleteItem: MouseEventHandler<HTMLButtonElement> = () => {
    onDelete(id);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={inputId}
        aria-label={`Toggle packed status of ${description}`}
        checked={isPacked}
        onChange={handleChangeIsPacked}
      />

      <label
        htmlFor={inputId}
        style={isPacked ? { textDecoration: 'line-through' } : {}}
      >
        &nbsp;{quantity} {description}
      </label>

      <button
        aria-label={`Delete ${description} from packing list`}
        onClick={handleClickToDeleteItem}
      >
        ❌
      </button>
    </div>
  );
}
