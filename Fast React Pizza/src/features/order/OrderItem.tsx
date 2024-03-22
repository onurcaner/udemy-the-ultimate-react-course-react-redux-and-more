import { OrderAttributes } from '../../services/restaurant/types';
import { formatCurrency } from '../../utils/formatCurrency';

export interface OrderItemProps {
  item: OrderAttributes['cart'][0];
}

export function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-semibold">{quantity}x</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
