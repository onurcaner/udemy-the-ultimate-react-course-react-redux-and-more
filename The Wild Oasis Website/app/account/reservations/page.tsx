import type { Metadata } from 'next';
import type { JSX } from 'react';

import { appRevalidates } from '@/app/_appRevalidates';
import { appRoutes } from '@/app/_appRoutes';
import { CustomLink } from '@/app/_components/CustomLink';
import { H2 } from '@/app/_components/H2';
import { Ul } from '@/app/_components/Ul';
import { authUser } from '@/app/_features/auth/authUser';
import { ReservationCard } from '@/app/_features/reservations/ReservationCard';
import { getBookingsOfGuest } from '@/app/_services/apiBookings';
import { getGuest } from '@/app/_services/apiGuests';

export const revalidate = Math.min(
  appRevalidates.bookings,
  appRevalidates.guest,
);

export const metadata: Metadata = {
  title: 'Reservations',
};
export default async function ReservationsPage(): Promise<JSX.Element> {
  const { email } = await authUser();
  if (!email) throw new Error('email is null');

  const guest = await getGuest(email);
  if (!guest) throw new Error('guest is null');

  const bookings = await getBookingsOfGuest(guest.id);

  return (
    <>
      <H2>Your reservations</H2>

      {bookings.length === 0 && (
        <p>
          You have no reservations yet. Check out our{' '}
          <CustomLink href={appRoutes.cabins} $variant="underline">
            luxury cabins &rarr;
          </CustomLink>
        </p>
      )}

      {bookings.length !== 0 && (
        <Ul className="flex flex-col gap-8">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <ReservationCard booking={booking} />
            </li>
          ))}
        </Ul>
      )}
    </>
  );
}
