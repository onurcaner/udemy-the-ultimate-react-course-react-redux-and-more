import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { PAGINATION_ITEM_COUNT, SearchParamsNamesGlobal } from '../../config';
import { getBookings } from '../../services/apiBookings';
import {
  QueryKeyOfBookings,
  SearchParamsNamesForBookings,
  SearchParamsSortValuesForBookings,
  SearchParamsStatusValuesForBookings,
} from './config';

export function useQueryBookingsFilteredSortedPaginatedPrefetched() {
  const [searchParams] = useSearchParams();

  const statusParam =
    searchParams.get(SearchParamsNamesForBookings.Status) ??
    SearchParamsStatusValuesForBookings.All;
  const sortParam =
    searchParams.get(SearchParamsNamesForBookings.Sort) ??
    SearchParamsSortValuesForBookings.DateDescending;
  const pageParam = searchParams.get(SearchParamsNamesGlobal.Page) ?? '1';

  const queryKey: string[] = [
    QueryKeyOfBookings,
    `${SearchParamsNamesForBookings.Status}=${statusParam}`,
    `${SearchParamsNamesForBookings.Sort}=${sortParam}`,
    `${SearchParamsNamesGlobal.Page}=${pageParam}`,
  ];

  const getBookingsOptions: Parameters<typeof getBookings>['0'] = {
    status: statusParam as SearchParamsStatusValuesForBookings,
    sort: sortParam as SearchParamsSortValuesForBookings,
    page: +pageParam,
  };

  const query = useQuery({
    queryKey,
    queryFn: getBookings.bind(null, getBookingsOptions),
  });
  const queryClient = useQueryClient();

  if (!query.data?.count) return query;

  const totalPages = Math.ceil(query.data.count / PAGINATION_ITEM_COUNT);
  const currentPage = +pageParam;

  // Prefetch
  if (currentPage < totalPages) {
    const queryKey: string[] = [
      QueryKeyOfBookings,
      `${SearchParamsNamesForBookings.Status}=${statusParam}`,
      `${SearchParamsNamesForBookings.Sort}=${sortParam}`,
      `${SearchParamsNamesGlobal.Page}=${currentPage + 1}`,
    ];

    const getBookingsOptions: Parameters<typeof getBookings>['0'] = {
      status: statusParam as SearchParamsStatusValuesForBookings,
      sort: sortParam as SearchParamsSortValuesForBookings,
      page: currentPage + 1,
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    queryClient.prefetchQuery({
      queryKey,
      queryFn: getBookings.bind(null, getBookingsOptions),
    });
  }

  if (currentPage !== 1) {
    const queryKey: string[] = [
      QueryKeyOfBookings,
      `${SearchParamsNamesForBookings.Status}=${statusParam}`,
      `${SearchParamsNamesForBookings.Sort}=${sortParam}`,
      `${SearchParamsNamesGlobal.Page}=${currentPage - 1}`,
    ];

    const getBookingsOptions: Parameters<typeof getBookings>['0'] = {
      status: statusParam as SearchParamsStatusValuesForBookings,
      sort: sortParam as SearchParamsSortValuesForBookings,
      page: currentPage - 1,
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    queryClient.prefetchQuery({
      queryKey,
      queryFn: getBookings.bind(null, getBookingsOptions),
    });
  }

  return query;
}
