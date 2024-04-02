import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCabin } from '../../services/apiCabins';

export function useMutationCreateCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      toast.success('A new cabin is created successfully');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
