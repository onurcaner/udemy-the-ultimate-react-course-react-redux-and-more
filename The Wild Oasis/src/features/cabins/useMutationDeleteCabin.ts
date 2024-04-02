import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteCabin } from '../../services/apiCabins';
import { CabinAttributes } from '../../services/types';

export function useMutationDeleteCabin(cabin: CabinAttributes) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCabin,
    onSuccess: async () => {
      toast.success(`Successfully deleted cabin: ${cabin.name}`);
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
