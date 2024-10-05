import type { JSX } from 'react';

import { appRevalidates } from '@/app/_appRevalidates';
import { Params } from '@/app/_appRoutes';
import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { H2 } from '@/app/_components/H2';
import { Select } from '@/app/_components/Select';
import { Textarea } from '@/app/_components/Textarea';
import { authUser } from '@/app/_features/auth/authUser';
import { ReservationCard } from '@/app/_features/reservations/ReservationCard';
import { ReservationsFormKeys } from '@/app/_features/reservations/types';
import { getBooking } from '@/app/_services/apiBookings';
import { getGuest } from '@/app/_services/apiGuests';
import { getSettings } from '@/app/_services/apiSettings';

export const revalidate = Math.min(
  appRevalidates.guest,
  appRevalidates.booking,
  appRevalidates.settings,
);

interface EditReservationPageParams {
  params: { [Params.BookingId]: string };
}
export default async function EditReservationPage({
  params,
}: EditReservationPageParams): Promise<JSX.Element> {
  const { email } = await authUser();
  if (!email) throw new Error('email is null');

  const guest = await getGuest(email);
  if (!guest) throw new Error('guest is null');

  if (email !== guest.email)
    throw new Error('You are not authenticated to edit this reservation');

  const [booking, settings] = await Promise.all([
    getBooking(+params.bookingId),
    getSettings(),
  ]);

  return (
    <>
      <H2>Edit Reservation:</H2>

      <ReservationCard booking={booking} />

      <Form className="mt-12">
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
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from(
              { length: settings.maximumGuestsPerBooking },
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
          <Button type="submit">Update reservation</Button>
        </div>
      </Form>
    </>
  );
}
