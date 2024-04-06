import { PAGINATION_ITEM_COUNT } from '../config';
import {
  SearchParamsSortValuesForBookings,
  SearchParamsStatusValuesForBookings,
} from '../features/bookings/config';
import { getToday } from '../utils/getToday';
import { supabase } from './supabase';
import { BookingAttributes, BookingAttributesExtended } from './types';

export async function getBookings(
  options:
    | {
        status: SearchParamsStatusValuesForBookings;
        sort: SearchParamsSortValuesForBookings;
        page: number;
      }
    | null
    | undefined,
) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)', { count: 'exact' });

  if (options?.status) {
    switch (options.status) {
      case SearchParamsStatusValuesForBookings.Unconfirmed:
        query = query.eq('status', 'unconfirmed');
        break;
      case SearchParamsStatusValuesForBookings.CheckedIn:
        query = query.eq('status', 'checked-in');
        break;
      case SearchParamsStatusValuesForBookings.CheckedOut:
        query = query.eq('status', 'checked-out');
        break;
    }
  }

  if (options?.sort) {
    switch (options.sort) {
      case SearchParamsSortValuesForBookings.DateAscending:
        query = query.order('startDate', { ascending: true });
        break;
      case SearchParamsSortValuesForBookings.TotalPriceAscending:
        query = query.order('totalPrice', { ascending: true });
        break;
      case SearchParamsSortValuesForBookings.TotalPriceDescending:
        query = query.order('totalPrice', { ascending: false });
        break;
      default:
        query = query.order('startDate', { ascending: false });
        break;
    }
  }

  if (options?.page) {
    const from = (options.page - 1) * PAGINATION_ITEM_COUNT;
    const to = options.page * PAGINATION_ITEM_COUNT - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  const returnMe = {
    data: data as unknown as BookingAttributesExtended[],
    count,
  };

  return returnMe;
}

export async function getBooking(id: BookingAttributes['id']) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data as unknown as BookingAttributesExtended;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: BookingAttributes['startDate'],
) {
  const { data, error } = await supabase
    .from('bookings')
    .select('createdAt, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: BookingAttributes['startDate']) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: Partial<BookingAttributes>,
) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
