import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { getBookingsAfterDate } from '../../services/apiBookings';
import { QueryKeyOfBookings } from '../bookings/config';
import { SearchParamsNamesForDashboard } from './config';

export function useQueryBookingsAfterDate() {
  const [searchParams] = useSearchParams();

  const lastDaysParam =
    searchParams.get(SearchParamsNamesForDashboard.LastDays) ?? '7';

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
