import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import { deleteCabin } from '../../services/apiCabins';
import { CabinAttributes } from '../../services/types';
import { Modal } from '../../ui/Modal';

export function useMutationDeleteCabin(cabin: CabinAttributes) {
  const { setOpenWindowName } = useContext(Modal.Context);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCabin,

    onSuccess: async () => {
      toast.success(`Successfully deleted cabin: ${cabin.name}`);
      setOpenWindowName('');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
