import { Link } from 'react-router-dom';

import { MENU, NEW, ORDER } from '../../pageUrls';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export function Cart(): JSX.Element {
  const cart = fakeCart;

  return (
    <div>
      <Link to={`/${MENU}`}>&larr; Back to menu</Link>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Link to={`/${ORDER}/${NEW}`}>Order pizzas</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
}
