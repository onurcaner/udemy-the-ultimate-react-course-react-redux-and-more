'use server';

import { revalidatePath } from 'next/cache';

import { authUser } from '../auth/authUser';
import { UpdateReservationsFormFields } from './types';
import { appRoutes } from '@/app/_appRoutes';
import { getBooking, updateBooking } from '@/app/_services/apiBookings';
import { getGuest } from '@/app/_services/apiGuests';
import { getSettings } from '@/app/_services/apiSettings';

export async function updateReservationAction(
  bookingId: number,
  formData: FormData,
) {
  const { email } = await authUser();
  if (!email) throw new Error('user is null');

  const [guest, booking, settings] = await Promise.all([
    getGuest(email),
    getBooking(bookingId),
    getSettings(),
  ]);

  if (guest?.email !== booking.guests.email)
    throw new Error('You are not authenticated to edit the reservation');

  const updateBookingFormFields = Object.fromEntries(
    formData.entries(),
  ) as unknown as UpdateReservationsFormFields;

  const maxCapacity = Math.min(
    settings.maximumGuestsPerBooking,
    booking.cabins.maxCapacity,
  );
  if (+updateBookingFormFields.numberOfGuests > maxCapacity)
    throw new Error(
      `Number of guests can not be more than ${String(maxCapacity)}`,
    );

  await updateBooking(bookingId, {
    numberOfGuests: +updateBookingFormFields.numberOfGuests,
    observations: updateBookingFormFields.observations.slice(0, 1000),
  });

  revalidatePath(appRoutes.reservations);
  revalidatePath(appRoutes.editReservation(String(bookingId)));
}
