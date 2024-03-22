import { MouseEventHandler } from 'react';
import { useLoaderData } from 'react-router-dom';

import { MENU, NEW, ORDER } from '../../pageUrls';
import { MenuItemAttributes } from '../../services/restaurant/types';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../../ui/Button';
import { CustomLink } from '../../ui/CustomLink';
import { userSelectors } from '../user/userSlice';
import { CartItem } from './CartItem';
import { cartActions, cartSelectors } from './cartSlice';
import { createCartItemsFromMinimalCartItems } from './createCartItemsFromMinimalCartItems';

export function Cart(): JSX.Element {
  const menu = useLoaderData() as MenuItemAttributes[];
  const username = useAppSelector(userSelectors.selectUsername);
  const minimalCart = useAppSelector(cartSelectors.selectCart);
  const dispatch = useAppDispatch();

  const cart = createCartItemsFromMinimalCartItems(minimalCart, menu);

  const handleClickToClearCart: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="py-4">
      <CustomLink to={`/${MENU}`} className="mb-12">
        &larr; Back to menu
      </CustomLink>

      {cart.length === 0 && (
        <p className="text-sm font-semibold sm:text-base">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      )}

      {cart.length > 0 && (
        <>
          <h2 className="text-amazing-500 mb-3 text-xl font-semibold">
            Your cart, {username}
          </h2>

          <ul className="mb-8 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </ul>

          <div className="flex justify-between gap-8">
            <CustomLink to={`/${ORDER}/${NEW}`}>
              <Button>Order pizzas</Button>
            </CustomLink>
            <Button
              className="!border-stone-300 !bg-stone-300 hover:!border-stone-200 hover:!bg-stone-200"
              onClick={handleClickToClearCart}
            >
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
