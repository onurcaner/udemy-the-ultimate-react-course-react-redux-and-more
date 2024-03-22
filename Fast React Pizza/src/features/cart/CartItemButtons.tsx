import { MouseEventHandler } from 'react';

import { useAppDispatch } from '../../store';
import { Button } from '../../ui/Button';
import { cartActions } from './cartSlice';

export interface CartItemButtonsProps {
  id: number;
  quantity: number;
  soldOut?: boolean;
}

export function CartItemButtons({
  id,
  quantity,
  soldOut,
}: CartItemButtonsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClickToAddItem: MouseEventHandler<HTMLButtonElement> = () => {
    if (soldOut) return;

    dispatch(cartActions.addItem(id));
  };

  const handleClickToDeleteItem: MouseEventHandler<HTMLButtonElement> = () => {
    if (soldOut) return;

    dispatch(cartActions.deleteItem(id));
  };

  return (
    <div className="flex items-center gap-2">
      {quantity > 0 && (
        <>
          <Button
            onClick={handleClickToDeleteItem}
            className="!px-[1em] !py-[0.25em] text-xs sm:text-sm"
          >
            Remove
          </Button>
          <span
            aria-label="Quantity"
            className="text-sm text-stone-700 sm:text-base"
          >
            {quantity}
          </span>
          <Button
            disabled={soldOut}
            onClick={handleClickToAddItem}
            className="!px-[1em] !py-[0.25em] text-xs sm:text-sm"
          >
            Add
          </Button>
        </>
      )}

      {quantity === 0 && (
        <Button
          disabled={soldOut}
          onClick={handleClickToAddItem}
          className="!px-[1em] !py-[0.25em] text-xs sm:text-sm"
        >
          Add to cart
        </Button>
      )}
    </div>
  );
}
