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

export type CreateCabinAttributes = Pick<
  CabinAttributes,
  | 'description'
  | 'discount'
  | 'imageUrl'
  | 'maxCapacity'
  | 'name'
  | 'regularPrice'
>;

export interface CustomUserMetadata {
  fullName: string;
  avatarUrl: string;
}
