import { TrashIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

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
  ...props
}: DeleteReservationButtonProps): JSX.Element {
  return (
    <Button
      $variant="outline"
      className={twMerge('flex items-center', className)}
      {...props}
    >
      <span>
        <TrashIcon className="icon" />
      </span>
      <span>Delete</span>
    </Button>
  );
}
