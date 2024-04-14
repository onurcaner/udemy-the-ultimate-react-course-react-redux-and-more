import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateUserData } from '../../services/apiAuthentication';
import {
  QueryKeyOfAuthenticatedUser,
  QueryKeyOfAuthenticatedUserAvatar,
} from './config';

export function useMutationLoggedInUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserData,

    onSuccess: async () => {
      toast.success('User data is updated successfuly');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeyOfAuthenticatedUser],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeyOfAuthenticatedUserAvatar],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
