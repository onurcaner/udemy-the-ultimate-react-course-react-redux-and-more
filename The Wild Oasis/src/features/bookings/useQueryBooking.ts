import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBooking } from '../../services/apiBookings';
import { QueryKeyOfBooking } from './config';

export function useQueryBooking() {
  const { id } = useParams();

  if (!id) throw new Error('Params does not have id');

  return useQuery({
    queryKey: [QueryKeyOfBooking, id],
    queryFn: getBooking.bind(null, +id),
  });
}
