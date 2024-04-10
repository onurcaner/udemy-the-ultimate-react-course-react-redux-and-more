import { useQuery } from '@tanstack/react-query';

import { getLoggedInUser } from '../../services/apiAuthentication';
import { QueryKeyOfAuthenticatedUser } from './config';

export function useQueryLoggedInUser() {
  return useQuery({
    queryKey: [QueryKeyOfAuthenticatedUser],
    queryFn: getLoggedInUser,
  });
}
