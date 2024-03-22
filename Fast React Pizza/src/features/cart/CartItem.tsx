import { CartItemAttributes } from '../../services/restaurant/types';
import { formatCurrency } from '../../utils/formatCurrency';
import { CartItemButtons } from './CartItemButtons';

export function CartItem({ item }: { item: CartItemAttributes }): JSX.Element {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-2 md:flex md:items-center md:gap-16">
      <p className="mb-1.5 md:mb-0 md:mr-auto">
        {quantity}x {name}
      </p>
      <div className="flex items-center justify-between gap-6 text-sm">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <CartItemButtons id={pizzaId} quantity={quantity} />
      </div>
    </li>
  );
}
