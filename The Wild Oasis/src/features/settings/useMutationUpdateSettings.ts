import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSettings } from '../../services/apiSettings';

export function useMutationUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: async () => {
      toast.success('Settings updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
