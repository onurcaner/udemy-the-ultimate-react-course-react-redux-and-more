// Test ID: IIDSAT
import { useLoaderData } from 'react-router-dom';

import { OrderAttributes } from '../../services/restaurant/types';
import { calculateMinutesLeft } from '../../utils/calculateMinutesLeft';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { OrderItem } from './OrderItem';

export function Order(): JSX.Element {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData() as OrderAttributes;
  /* Everyone can search for all orders, so for privacy reasons we're gonna
  gonna exclude names or address, these are only for the restaurant staff */

  const deliveryIn = calculateMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-10 py-6 text-sm sm:text-base">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="mb-2 text-xl font-semibold md:mb-0">
          Order #{id} status:
        </h2>

        <div className="space-x-4">
          {priority && (
            <span className="inline-block rounded-full bg-red-600 px-4 py-1 font-semibold uppercase text-red-50">
              Priority
            </span>
          )}
          <span className="inline-block rounded-full bg-green-600 px-4 py-1 font-semibold uppercase text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="bg-stone-200 p-4 md:flex md:items-center md:justify-between">
        <p className="mb-2 font-semibold md:mb-0">
          {deliveryIn >= 0
            ? `Only ${calculateMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="mb-8 divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-y-1 bg-stone-200 p-4">
        <p className="text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
