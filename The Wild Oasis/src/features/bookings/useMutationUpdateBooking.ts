import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { updateBooking } from '../../services/apiBookings';
import { BookingAttributes } from '../../services/types';
import { QueryKeyOfBooking, QueryKeyOfBookings } from './config';

export function useMutationUpdateBooking(explicitId?: number) {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const idToMutate = explicitId ?? (id ? +id : 0);

  const mutation = useMutation({
    mutationFn: (update: Partial<BookingAttributes>) => {
      return updateBooking(idToMutate, update);
    },

    onSuccess: async (booking) => {
      toast.success(`Booking #${booking.id} is successfully updated`);
      await queryClient.invalidateQueries({
        queryKey: [QueryKeyOfBooking],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeyOfBookings],
        exact: false,
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
