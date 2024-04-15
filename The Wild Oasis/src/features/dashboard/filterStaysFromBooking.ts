import { BookingAttributesExtended } from '../../services/types';

export function filterStaysFromBooking({
  status,
}: BookingAttributesExtended): boolean {
  if (status === 'checked-in') return true;
  if (status === 'checked-out') return true;
  return false;
}
