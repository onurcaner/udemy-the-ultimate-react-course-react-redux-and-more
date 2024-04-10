import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuthentication';
import { QueryKeyOfAuthenticatedUser } from './config';

export function useMutationLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: (data) => {
      toast.success('Logged in successfully');
      queryClient.setQueryData([QueryKeyOfAuthenticatedUser], data.user);
      navigate(`/`);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
