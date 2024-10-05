'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  JSX,
  MouseEventHandler,
} from 'react';
import { useTransition } from 'react';
import { twMerge } from 'tailwind-merge';

import { deleteReservationAction } from './deleteReservationAction';
import { Button } from '@/app/_components/Button';

interface DeleteReservationButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  bookingId: number;
}

export function DeleteReservationButton({
  bookingId,
  className,
  disabled,
  ...props
}: DeleteReservationButtonProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const isDeletionConfirmed = confirm(
      'Are you sure to delete the reservation',
    );

    if (isDeletionConfirmed)
      startTransition(() => deleteReservationAction(bookingId));
  };

  return (
    <Button
      $variant="outline"
      className={twMerge('flex items-center', className)}
      disabled={isPending || disabled}
      onClick={handleClick}
      {...props}
    >
      <span>
        <TrashIcon className="icon" />
      </span>
      <span>{isPending ? 'Deleting...' : 'Delete'}</span>
    </Button>
  );
}
