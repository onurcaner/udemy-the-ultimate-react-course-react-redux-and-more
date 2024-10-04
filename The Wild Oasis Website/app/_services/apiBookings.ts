import { eachDayOfInterval } from 'date-fns';
import { cache } from 'react';

import { delayDebug } from './delayDebug';
import { supabase } from './supabase';
import { BookingAttributesExtended } from './types';

export const getBookingsOfGuest = cache(async (guestId: number) => {
  console.log(`Inside: getBookingsOfGuest(${String(guestId)})`);
  await delayDebug();

  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as unknown as BookingAttributesExtended[];
});

export const getBookingsFromTodayByCabinId = cache(async (cabinId: number) => {
  console.log(`Inside: getBookingsFromTodayByCabinId(${String(cabinId)})`);
  await delayDebug();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today.toISOString()}`);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
});

export const getBookedDatesByCabinId = cache(async (cabinId: number) => {
  console.log(`Inside: getBookedDatesByCabinId(${String(cabinId)})`);
  await delayDebug();

  const bookings = await getBookingsFromTodayByCabinId(cabinId);

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = bookings
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
});
