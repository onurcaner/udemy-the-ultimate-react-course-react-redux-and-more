import { MouseEventHandler, useState } from 'react';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

import { MenuItemAttributes } from '../../services/restaurant/types';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../../ui/Button';
import { Checkbox } from '../../ui/Checkbox';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { formatCurrency } from '../../utils/formatCurrency';
import { cartSelectors } from '../cart/cartSlice';
import { createCartItemsFromMinimalCartItems } from '../cart/createCartItemsFromMinimalCartItems';
import { userActions, userSelectors } from '../user/userSlice';

export function CreateOrder(): JSX.Element {
  const user = useAppSelector(userSelectors.selectUser);
  const minimalCart = useAppSelector(cartSelectors.selectCart);
  const priority = useAppSelector(cartSelectors.selectPriority);
  const [localPriority, setLocalPriority] = useState(() => priority);
  const navigation = useNavigation();
  const menu = useLoaderData() as MenuItemAttributes[];
  const errors = useActionData() as
    | Partial<Record<'customer' | 'address' | 'phone', string>>
    | undefined;
  const dispatch = useAppDispatch();

  const isSubmitting = navigation.state === 'submitting';

  const normalPrice = createCartItemsFromMinimalCartItems(
    minimalCart,
    menu,
  ).reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const priorityPrice = normalPrice * (1 + 0.2 * (localPriority ? 1 : 0));

  const handleClickToFetchAddress: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    dispatch(userActions.getAddressThunk()).unwrap;
  };

  const randomNumber = Math.random();

  return (
    <div className="py-8">
      <h2 className="mb-6 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form
        method="POST"
        className="grid grid-cols-1 items-center gap-x-4 gap-y-2 md:grid-cols-[max-content_1fr]"
      >
        <Label htmlFor={`customer_${randomNumber}`}>First Name</Label>
        <Input
          id={`customer_${randomNumber}`}
          type="text"
          name="customer"
          placeholder="John Smith"
          defaultValue={user.username}
          required
        />
        <p className="mb-5 text-sm text-amber-600 sm:text-base md:col-start-2 md:ml-4">
          {errors?.customer ?? ''}
        </p>

        <Label htmlFor={`phone_${randomNumber}`}>Phone Number</Label>
        <Input
          id={`phone_${randomNumber}`}
          type="tel"
          name="phone"
          placeholder="555 123 4567"
          defaultValue={user.phone}
          required
        />
        <p className="mb-5 text-sm text-amber-600 sm:text-base md:col-start-2 md:ml-4">
          {errors?.phone ?? ''}
        </p>

        <Label htmlFor={`address_${randomNumber}`}>Address</Label>
        <div className="relative flex flex-col gap-2 sm:flex-row">
          <Input
            id={`address_${randomNumber}`}
            name="address"
            placeholder="Address for a delicious pizza"
            defaultValue={user.address}
            required
            disabled={user.status === 'pending'}
          />
          {user.status !== 'succeeded' && (
            <Button
              type="button"
              onClick={handleClickToFetchAddress}
              disabled={user.status === 'pending'}
              className="text-nowrap !px-[0.5em] !py-[0.25em]"
            >
              {user.status === 'pending' ? 'Working...' : 'Get position'}
            </Button>
          )}
        </div>
        <p className="mb-5 text-sm text-amber-600 sm:text-base md:col-start-2 md:ml-4">
          {errors?.address ?? user.error?.message ?? ''}
        </p>

        <div className="col-span-full mb-6 flex items-center gap-4">
          <Checkbox
            id={`priority_${randomNumber}`}
            type="checkbox"
            name="priority"
            checked={localPriority}
            onChange={(e) => {
              setLocalPriority(e.target.checked);
            }}
          />
          <Label htmlFor={`priority_${randomNumber}`} className="font-medium">
            Want to give your order priority?
          </Label>
        </div>

        <div className="col-span-full">
          <Button disabled={isSubmitting || minimalCart.length === 0}>
            {isSubmitting
              ? 'Placing order'
              : `Order now ${formatCurrency(priorityPrice)}`}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(minimalCart)} />
        <input
          type="hidden"
          name="position"
          value={
            user.position
              ? `${user.position.latitude},${user.position.longitude}`
              : ''
          }
        />
      </Form>
    </div>
  );
}
