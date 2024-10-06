import type { Metadata } from 'next';
import type { JSX } from 'react';

import { appRevalidates } from '@/app/_appRevalidates';
import { Params } from '@/app/_appRoutes';
import { H2 } from '@/app/_components/H2';
import { authUser } from '@/app/_features/auth/authUser';
import { EditReservationForm } from '@/app/_features/reservations/EditReservationForm';
import { ReservationCard } from '@/app/_features/reservations/ReservationCard';
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

export const metadata: Metadata = {
  title: 'Edit Reservation',
};

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
      <EditReservationForm booking={booking} settings={settings} />
    </>
  );
}
