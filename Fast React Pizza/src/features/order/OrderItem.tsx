import {
  MenuItemAttributes,
  OrderAttributes,
} from '../../services/restaurant/types';
import { formatCurrency } from '../../utils/formatCurrency';

export interface OrderItemProps {
  item: OrderAttributes['cart'][0];
  isMenuLoaded: boolean;
  menu?: MenuItemAttributes[];
}

export function OrderItem({ item, isMenuLoaded, menu }: OrderItemProps) {
  const { quantity, name, totalPrice, pizzaId } = item;

  let ingredients: string[] = [];
  if (isMenuLoaded && menu) {
    const temp = menu.find((item) => item.id === pizzaId);
    if (!temp) return;
    ingredients = temp.ingredients;
  }

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-semibold">{quantity}x</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="mt-2 text-xs text-stone-600 sm:text-sm">
        {isMenuLoaded ? ingredients.join(', ') : 'Loading...'}
      </p>
    </li>
  );
}
