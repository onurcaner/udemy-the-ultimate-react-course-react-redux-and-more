import { useSearchParams } from 'react-router-dom';

import { SearchParamsNamesForDashboard } from './config';

export function useSearchParamsLastDays() {
  const [searchParams] = useSearchParams();

  const lastDaysParam =
    searchParams.get(SearchParamsNamesForDashboard.LastDays) ?? '7';

  return lastDaysParam;
}
