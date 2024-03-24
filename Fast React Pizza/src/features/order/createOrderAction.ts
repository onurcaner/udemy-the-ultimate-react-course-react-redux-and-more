import { ActionFunction, redirect } from 'react-router-dom';

import { MENU, ORDER } from '../../pageUrls';
import { createOrder } from '../../services/restaurant/createOrder';
import { getMenu } from '../../services/restaurant/getMenu';
import {
  MinimalCartItemAttributes,
  NewOrderAttributes,
} from '../../services/restaurant/types';
import { store } from '../../store';
import { cartActions } from '../cart/cartSlice';
import { createCartItemsFromMinimalCartItems } from '../cart/createCartItemsFromMinimalCartItems';
import { userActions } from '../user/userSlice';

interface FromFormData {
  customer: string;
  phone: string;
  address: string;
  cart: string;
  position: string;
  priority?: 'on';
}

export const createOrderAction: ActionFunction = async ({ request }) => {
  const [formData, menu] = await Promise.all([
    request.formData(),
    getMenu({ signal: request.signal }),
  ]);
  const fromFormData = Object.fromEntries(
    formData.entries(),
  ) as unknown as FromFormData;

  const minimalCart = JSON.parse(
    fromFormData.cart,
  ) as MinimalCartItemAttributes[];

  const newOrder: NewOrderAttributes = {
    address: fromFormData.address,
    cart: createCartItemsFromMinimalCartItems(minimalCart, menu),
    customer: fromFormData.customer,
    phone: fromFormData.phone,
    priority: fromFormData.priority === 'on' ? true : false,
    position: fromFormData.position,
  };

  store.dispatch(
    userActions.updateUser({
      address: newOrder.address,
      phone: newOrder.phone,
      username: newOrder.customer,
    }),
  );
  store.dispatch(cartActions.setPriority(newOrder.priority));

  if (newOrder.cart.length === 0) return redirect(`/${MENU}`);

  const errors: Partial<Record<'address' | 'customer' | 'phone', string>> = {};
  if (newOrder.address.length < 10)
    errors.address = 'Address should be at least 10 characters long';
  if (newOrder.customer.length < 3)
    errors.customer = 'Name should be at least 3 characters long';
  if (isValidPhone(newOrder.phone)) errors.phone = 'Phone number is not valid';

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newOrder, { signal: request.signal });

  store.dispatch(cartActions.clearCart());

  return redirect(`/${ORDER}/${order.id}`);
};

// https://uibakery.io/regex-library/phone-number
function isValidPhone(phone: string): boolean {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone,
  );
}
