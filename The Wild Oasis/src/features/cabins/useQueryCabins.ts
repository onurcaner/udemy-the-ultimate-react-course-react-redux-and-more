import { useQuery } from '@tanstack/react-query';

import { getCabins } from '../../services/apiCabins';
import { QueryKeyOfCabins } from './config';

export function useQueryCabins() {
  return useQuery({ queryKey: [QueryKeyOfCabins], queryFn: getCabins });
}
