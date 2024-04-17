import { useQuery } from '@tanstack/react-query';

import { getBookingsTodaysActivities } from '../../services/apiBookings';
import { QueryKeyOfBookings } from '../bookings/config';
import { QueryKeyOfTodaysActivities } from './config';

export function useQueryBookingsTodaysActivities() {
  return useQuery({
    queryKey: [QueryKeyOfBookings, QueryKeyOfTodaysActivities],
    queryFn: getBookingsTodaysActivities,
  });
}
