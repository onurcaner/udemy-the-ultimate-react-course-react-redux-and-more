import { MouseEventHandler, ReactNode } from 'react';

import { Button } from '../../ui/Button';
import { useMutationUpdateBooking } from '../bookings/useMutationUpdateBooking';

export function CheckOutButton({
  bookingId,
  children,
  isStyled = true,
}: {
  bookingId: number;
  children: ReactNode;
  isStyled?: boolean;
}): JSX.Element {
  const { mutate, isPending } = useMutationUpdateBooking(bookingId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    mutate({
      status: 'checked-out',
    });
  };

  if (isStyled)
    return (
      <Button
        $size="small"
        type="button"
        onClick={handleClick}
        disabled={isPending}
      >
        {children}
      </Button>
    );
  else
    return (
      <button type="button" onClick={handleClick} disabled={isPending}>
        {children}
      </button>
    );
}
