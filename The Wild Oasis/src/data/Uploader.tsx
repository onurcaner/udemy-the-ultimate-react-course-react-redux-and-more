import { useQueryClient } from '@tanstack/react-query';
import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';

import { supabase } from '../services/supabase';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import { subtractDates } from '../utils/subtractDates';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);
  console.log(allGuestIds, allCabinIds);

  const finalBookings = bookings.map((booking) => {
    console.log(booking.guestId - 1, booking.cabinId - 1);
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const nights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = nights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? nights * 15 * booking.numberOfGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      nights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      /*       guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1), */
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
    await queryClient.refetchQueries();
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
    await queryClient.refetchQueries();
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--color-grey-200)',
        padding: '0.5rem',
        borderRadius: 'var(--border-radius-md)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <Heading as="h4">Sample Data</Heading>

      <Button $size="small" onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button $size="small" onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}
