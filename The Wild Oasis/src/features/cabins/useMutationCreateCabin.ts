import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import { createCabin } from '../../services/apiCabins';
import { Modal } from '../../ui/Modal';

export function useMutationCreateCabin() {
  const { setOpenWindowName } = useContext(Modal.Context);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCabin,

    onSuccess: async () => {
      toast.success('A new cabin is created successfully');
      setOpenWindowName('');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
