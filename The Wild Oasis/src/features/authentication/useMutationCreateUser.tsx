import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createUser } from '../../services/apiAuthentication';

export function useMutationCreateUser() {
  const mutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success('A new user is created successfully');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
