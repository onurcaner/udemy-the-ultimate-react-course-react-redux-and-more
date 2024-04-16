import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';

import { getBookingsAfterDate } from '../../services/apiBookings';
import { QueryKeyOfBookings } from '../bookings/config';
import { SearchParamsNamesForDashboard } from './config';
import { useSearchParamsLastDays } from './useSearchParamsLastDays';

export function useQueryBookingsAfterDate() {
  const lastDaysParam = useSearchParamsLastDays();

  const queryKey: string[] = [
    QueryKeyOfBookings,
    `${SearchParamsNamesForDashboard.LastDays}=${lastDaysParam}`,
  ];

  const dateISO = sub(new Date(), { days: +lastDaysParam }).toISOString();

  return useQuery({
    queryKey,
    queryFn: getBookingsAfterDate.bind(null, dateISO),
  });
}
