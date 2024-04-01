import { Database } from './supabaseAutoTypes';

type Tables = Database['public']['Tables'];

export type BookingAttributes = Tables['bookings']['Row'];
export type CabinAttributes = Tables['cabins']['Row'];
export type GuestAttributes = Tables['guests']['Row'];
export type SettingsAttributes = Tables['settings']['Row'];

export type CreateCabinAttributes = Pick<
  CabinAttributes,
  | 'description'
  | 'discount'
  | 'imageUrl'
  | 'maxCapacity'
  | 'name'
  | 'regularPrice'
>;
