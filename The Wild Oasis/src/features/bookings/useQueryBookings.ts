import { useQuery } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';
import { QueryKeyOfBookings } from './config';

export function useQueryBookings() {
  return useQuery({
    queryKey: QueryKeyOfBookings,
    queryFn: getBookings,
  });
}
