import { useQuery } from '@tanstack/react-query';

import { getSettings } from '../../services/apiSettings';

export function useQuerySettings() {
  return useQuery({ queryKey: ['settings'], queryFn: getSettings });
}
