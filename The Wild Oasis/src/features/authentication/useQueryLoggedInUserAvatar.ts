import { useQuery } from '@tanstack/react-query';

import { getLoggedInUserAvatar } from '../../services/apiAuthentication';
import { QueryKeyOfAuthenticatedUserAvatar } from './config';

export function useQueryLoggedInUserAvatar() {
  return useQuery({
    queryKey: [QueryKeyOfAuthenticatedUserAvatar],
    queryFn: getLoggedInUserAvatar,
    staleTime: Infinity,
  });
}
