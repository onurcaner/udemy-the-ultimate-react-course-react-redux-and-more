import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking } from '../../services/apiBookings';
import { QueryKeyOfBookings } from './config';

export function useMutationDeleteBooking() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBooking,

    onSuccess: async () => {
      toast.success(`Booking is successfully deleted`);
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
