import type { Database } from './supabase-generated-types';

type Tables = Database['public']['Tables'];

export type BookingAttributes = Tables['bookings']['Row'] & {
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
};
export type CabinAttributes = Tables['cabins']['Row'];
export type GuestAttributes = Tables['guests']['Row'];
export type SettingsAttributes = Tables['settings']['Row'];

export type BookingAttributesExtended = BookingAttributes & {
  cabins: CabinAttributes;
  guests: GuestAttributes;
};

export type CreateBookingAttributes = Pick<
  BookingAttributes,
  | 'startDate'
  | 'endDate'
  | 'nights'
  | 'numberOfGuests'
  | 'cabinPrice'
  | 'extrasPrice'
  | 'totalPrice'
  | 'status'
  | 'hasBreakfast'
  | 'isPaid'
  | 'observations'
  | 'cabinId'
  | 'guestId'
>;
export type UpdateBookingAttributes = Pick<
  BookingAttributesExtended,
  'numberOfGuests' | 'observations'
>;

export type CreateCabinAttributes = Pick<
  CabinAttributes,
  | 'description'
  | 'discount'
  | 'imageUrl'
  | 'maxCapacity'
  | 'name'
  | 'regularPrice'
>;

export type CreateGuestAttributes = Pick<GuestAttributes, 'email' | 'fullName'>;
export type UpdateGuestAttributes = Partial<
  Pick<GuestAttributes, 'countryFlag' | 'nationalId' | 'nationality'>
>;

export interface CustomUserMetadata {
  fullName: string;
  avatarUrl: string;
}
export interface CountryAttributes {
  name: string;
  flag: string;
  independent: boolean;
}
