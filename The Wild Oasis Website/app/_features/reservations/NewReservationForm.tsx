'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type {
  DetailedHTMLProps,
  FormEventHandler,
  HTMLAttributes,
  JSX,
} from 'react';
import { useTransition } from 'react';

import { createReservationAction } from './createReservationAction';
import { ReservationsFormKeys } from './types';
import { useNewReservationContext } from './useNewReservationContext';
import { appRoutes } from '@/app/_appRoutes';
import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { Select } from '@/app/_components/Select';
import { Textarea } from '@/app/_components/Textarea';
import { CabinAttributes, SettingsAttributes } from '@/app/_services/types';

interface NewReservationFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cabin: CabinAttributes;
  user: Record<'name' | 'image', string>;
  settings: SettingsAttributes;
}

export function NewReservationForm({
  cabin,
  user,
  settings,
  ...props
}: NewReservationFormProps): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { nights, dateRange, resetDateRange } = useNewReservationContext();

  const startDate = dateRange?.from ?? new Date();
  const endDate = dateRange?.to ?? new Date();
  const isDisabled = isPending || nights < settings.minimumBookingLength;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const formElement = e.target as HTMLFormElement;
    startTransition(async () => {
      await createReservationAction(cabin.id, new FormData(formElement));
      router.push(appRoutes.reservationsThankYou);
      resetDateRange();
    });
  };

  return (
    <div {...props}>
      <div className="flex items-center justify-between bg-primary-200 px-12 py-4 text-primary-700 dark:bg-primary-800 dark:text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              referrerPolicy="no-referrer"
              className="object-contain object-center"
              src={user.image}
              alt={user.name}
              fill
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={ReservationsFormKeys.NumberOfGuests}>
            How many guests?
          </label>
          <Select
            name={ReservationsFormKeys.NumberOfGuests}
            id={ReservationsFormKeys.NumberOfGuests}
            required
          >
            <option value={0} key={0}>
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity })
              .map((_, i) => i + 1)
              .map((x) => (
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
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <input
          type="hidden"
          name={ReservationsFormKeys.StartDate}
          id={ReservationsFormKeys.StartDate}
          value={startDate.toISOString()}
        />
        <input
          type="hidden"
          name={ReservationsFormKeys.EndDate}
          id={ReservationsFormKeys.EndDate}
          value={endDate.toISOString()}
        />

        <div className="flex items-center justify-end gap-6">
          {nights < settings.minimumBookingLength && (
            <p className="text-base text-primary-700 dark:text-primary-300">
              Start by selecting dates
            </p>
          )}

          <Button disabled={isDisabled} type="submit">
            {isPending ? 'Reserving...' : 'Reserve now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
