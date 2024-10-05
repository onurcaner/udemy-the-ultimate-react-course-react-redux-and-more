'use server';

import { revalidatePath } from 'next/cache';

import { authUser } from '../auth/authUser';
import { appRoutes } from '@/app/_appRoutes';
import { deleteBooking, getBooking } from '@/app/_services/apiBookings';
import { getGuest } from '@/app/_services/apiGuests';

export async function deleteReservationAction(bookingId: number) {
  const { email } = await authUser();
  if (!email) throw new Error('user is null');

  const guest = await getGuest(email);
  if (!guest) throw new Error('guest is null');

  const booking = await getBooking(bookingId);

  if (booking.guests.email !== email)
    throw new Error('You are not authenticated to delete this reservation');

  await deleteBooking(bookingId);
  revalidatePath(appRoutes.reservations);
  revalidatePath(appRoutes.cabin(String(booking.cabinId)));
}
