import { useQuery } from '@tanstack/react-query';

import { getCabins } from '../../services/apiCabins';

export function useQueryCabins() {
  return useQuery({ queryKey: ['cabins'], queryFn: getCabins });
}
