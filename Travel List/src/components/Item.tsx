import { ItemAttributes } from '../ItemData';

interface ItemProps {
  itemAttributes: ItemAttributes;
}

export function Item({ itemAttributes }: ItemProps) {
  const { description, id, isPacked, quantity } = itemAttributes;
  const inputId = `${id}_${description}`;
  return (
    <div>
      <input type="checkbox" id={inputId} checked={isPacked} />
      <label
        htmlFor={inputId}
        style={isPacked ? { textDecoration: 'line-through' } : {}}
      >
        &nbsp;{quantity} {description}
      </label>
      <button>❌</button>
    </div>
  );
}
