import { MenuItemAttributes } from '../../services/restaurant/types';
import { formatCurrency } from '../../utils/formatCurrency';

export function MenuItem({
  menuItem,
}: {
  menuItem: MenuItemAttributes;
}): JSX.Element {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = menuItem;

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}
