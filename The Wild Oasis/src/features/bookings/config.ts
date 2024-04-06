import { BookingAttributes } from '../../services/types';

export const QueryKeyOfBookings = 'bookings';
export const QueryKeyOfBooking = 'booking';
export enum SearchParamsNamesForBookings {
  Status = 'status',
  Sort = 'sort',
}
export enum SearchParamsStatusValuesForBookings {
  All = 'all',
  Unconfirmed = 'unconfirmed',
  CheckedIn = 'checkedIn',
  CheckedOut = 'checkedOut',
}
export enum SearchParamsSortValuesForBookings {
  DateAscending = 'dateAscending',
  DateDescending = 'dateDescending',
  TotalPriceAscending = 'totalPriceAscending',
  TotalPriceDescending = 'totalPriceDescending',
}
export const statusToTagName: Record<
  BookingAttributes['status'],
  'blue' | 'green' | 'silver'
> = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
};
