import { ActionFunction, redirect } from 'react-router-dom';

import { ORDER } from '../../pageUrls';
import { createOrder } from '../../services/restaurant/createOrder';
import {
  CartItemAttributes,
  NewOrderAttributes,
} from '../../services/restaurant/types';

interface FromFormData {
  customer: string;
  phone: string;
  address: string;
  cart: string;
  priority?: 'on';
}

export const createOrderAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fromFormData = Object.fromEntries(
    formData.entries(),
  ) as unknown as FromFormData;

  const newOrder: NewOrderAttributes = {
    address: fromFormData.address,
    cart: JSON.parse(fromFormData.cart) as CartItemAttributes[],
    customer: fromFormData.customer,
    phone: fromFormData.phone,
    priority: fromFormData.priority === 'on' ? true : false,
  };

  const errors: Partial<Record<'address' | 'customer' | 'phone', string>> = {};
  if (newOrder.address.length < 10)
    errors.address = 'Address should be at least 10 characters long';
  if (newOrder.customer.length < 3)
    errors.address = 'Name should be at least 3 characters long';
  if (isValidPhone(newOrder.phone))
    errors.address = 'Phone number is not valid';

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newOrder, { signal: request.signal });

  return redirect(`/${ORDER}/${order.id}`);
};

// https://uibakery.io/regex-library/phone-number
function isValidPhone(phone: string): boolean {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone,
  );
}
