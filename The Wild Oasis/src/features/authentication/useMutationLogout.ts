import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../services/apiAuthentication';

export function useMutationLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success('Logged out successfully');
      queryClient.removeQueries();
      navigate(`/`);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
