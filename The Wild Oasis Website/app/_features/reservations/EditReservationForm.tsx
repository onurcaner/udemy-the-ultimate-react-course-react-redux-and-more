'use client';

import { useRouter } from 'next/navigation';
import type {
  DetailedHTMLProps,
  FormEventHandler,
  FormHTMLAttributes,
  JSX,
} from 'react';
import { useTransition } from 'react';

import { updateReservationAction } from './updateReservationAction';
import { appRoutes } from '@/app/_appRoutes';
import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { Select } from '@/app/_components/Select';
import { Textarea } from '@/app/_components/Textarea';
import { ReservationsFormKeys } from '@/app/_features/reservations/types';
import {
  BookingAttributesExtended,
  SettingsAttributes,
} from '@/app/_services/types';

interface EditReservationFormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  booking: BookingAttributesExtended;
  settings: SettingsAttributes;
}
export function EditReservationForm({
  booking,
  settings,
  ...props
}: EditReservationFormProps): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    console.log('here');
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;

    startTransition(async () => {
      await updateReservationAction(booking.id, new FormData(formElement));
      router.push(appRoutes.reservations);
    });
  };

  return (
    <Form {...props} onSubmit={handleSubmit}>
      <div>
        <label htmlFor={ReservationsFormKeys.NumberOfGuests}>
          How many guests?
        </label>
        <Select
          name={ReservationsFormKeys.NumberOfGuests}
          id={ReservationsFormKeys.NumberOfGuests}
          required
          defaultValue={booking.numberOfGuests}
        >
          {Array.from(
            {
              length: Math.min(
                settings.maximumGuestsPerBooking,
                booking.cabins.maxCapacity,
              ),
            },
            (_, i) => i + 1,
          ).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor={ReservationsFormKeys.Observations}>
          Anything we should know about your stay?
        </label>
        <Textarea
          name={ReservationsFormKeys.Observations}
          id={ReservationsFormKeys.Observations}
          defaultValue={booking.observations}
        />
      </div>

      <div className="flex items-center justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update reservation'}
        </Button>
      </div>
    </Form>
  );
}
