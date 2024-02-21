import { ChangeEventHandler, MouseEventHandler } from 'react';

import { ItemAttributes } from '../ItemData';

interface ItemProps {
  itemAttributes: ItemAttributes;
  onDelete: (id: number) => void;
  onToggleIsPacked: (id: number) => void;
}

export function Item({
  itemAttributes,
  onToggleIsPacked,
  onDelete,
}: ItemProps) {
  const { description, id, isPacked, quantity } = itemAttributes;
  const inputId = `${id}_${description}`;

  const handleChangeIsPacked: ChangeEventHandler = () => {
    onToggleIsPacked(id);
  };

  const handleClickDelete: MouseEventHandler = () => {
    onDelete(id);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={inputId}
        checked={isPacked}
        onChange={handleChangeIsPacked}
      />
      <label
        htmlFor={inputId}
        style={isPacked ? { textDecoration: 'line-through' } : {}}
      >
        &nbsp;{quantity} {description}
      </label>
      <button onClick={handleClickDelete}>❌</button>
    </div>
  );
}
