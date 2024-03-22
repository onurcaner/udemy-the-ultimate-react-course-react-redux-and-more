import { MenuItemAttributes } from '../../services/restaurant/types';
import { useAppSelector } from '../../store';
import { formatCurrency } from '../../utils/formatCurrency';
import { CartItemButtons } from '../cart/CartItemButtons';
import { cartSelectors } from '../cart/cartSlice';

export function MenuItem({
  menuItem,
}: {
  menuItem: MenuItemAttributes;
}): JSX.Element {
  const cartSibling = useAppSelector(
    cartSelectors.createSelectCartItem(menuItem.id),
  );

  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = menuItem;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={
          'aspect-square h-24 sm:h-32' +
          (soldOut ? ` opacity-80 grayscale` : '')
        }
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize text-stone-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-end justify-between text-sm font-medium uppercase text-stone-600">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          <CartItemButtons
            id={id}
            quantity={cartSibling?.quantity ?? 0}
            soldOut={soldOut}
          />
        </div>
      </div>
    </li>
  );
}
