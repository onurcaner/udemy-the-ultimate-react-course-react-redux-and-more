'use server';

import {
  differenceInDays,
  isDate,
  isWithinInterval,
  setHours,
  setMilliseconds,
  setMinutes,
} from 'date-fns';
import { revalidatePath } from 'next/cache';

import { authUser } from '../auth/authUser';
import type { CreateReservationsFormFields } from './types';
import { appRoutes } from '@/app/_appRoutes';
import {
  createBooking,
  getBookedDatesByCabinId,
} from '@/app/_services/apiBookings';
import { getCabin } from '@/app/_services/apiCabins';
import { getGuest } from '@/app/_services/apiGuests';
import { getSettings } from '@/app/_services/apiSettings';

export async function createReservationAction(
  cabinId: number,
  formData: FormData,
) {
  const { email } = await authUser();
  if (!email) throw new Error('email is null');
  const guest = await getGuest(email);
  if (!guest) throw new Error('guest is null');
  if (guest.email !== email)
    throw new Error('You are not authenticated to create a new reservation');

  const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(cabinId),
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);

  // Validation
  const formFields = Object.fromEntries(
    formData.entries(),
  ) as CreateReservationsFormFields;
  if (isDate(formFields.startDate)) throw new Error('Start date is invalid');
  if (isDate(formFields.endDate)) throw new Error('End date is invalid');
  const startDate = setMilliseconds(
    setMinutes(setHours(formFields.startDate, 12), 0),
    0,
  );
  const endDate = setMilliseconds(
    setMinutes(setHours(formFields.endDate, 12), 0),
    0,
  );
  if (
    bookedDates.some((date) =>
      isWithinInterval(date, {
        start: startDate,
        end: endDate,
      }),
    )
  )
    throw new Error('Your selected dates has already been booked');
  const nights = differenceInDays(endDate, startDate);
  if (
    nights < settings.minimumBookingLength ||
    nights > settings.maximumBookingLength
  )
    throw new Error('Invalid booking duration');
  if (
    +formFields.numberOfGuests <= 0 ||
    +formFields.numberOfGuests >
      Math.min(cabin.maxCapacity, settings.maximumGuestsPerBooking)
  )
    throw new Error('Number of guests is invalid');

  await createBooking({
    cabinId,
    nights,
    cabinPrice: (cabin.regularPrice - cabin.discount) * nights,
    endDate: endDate.toISOString(),
    extrasPrice: 0,
    guestId: guest.id,
    hasBreakfast: false,
    isPaid: false,
    numberOfGuests: +formFields.numberOfGuests,
    observations: formFields.observations.slice(0, 1000),
    startDate: startDate.toISOString(),
    status: 'unconfirmed',
    totalPrice: (cabin.regularPrice - cabin.discount) * nights,
  });
  revalidatePath(appRoutes.cabin(String(cabinId)));
  revalidatePath(appRoutes.reservations);
}
