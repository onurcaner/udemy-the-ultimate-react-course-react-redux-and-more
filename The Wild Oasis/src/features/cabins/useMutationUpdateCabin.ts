import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCabin } from '../../services/apiCabins';
import { CabinAttributes, CreateCabinAttributes } from '../../services/types';

export function useMutationUpdateCabin(cabin?: CabinAttributes) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updateAttributes: Partial<CreateCabinAttributes>) =>
      updateCabin(cabin?.id ?? 0, updateAttributes),
    onSuccess: async () => {
      toast.success('The cabin is updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
