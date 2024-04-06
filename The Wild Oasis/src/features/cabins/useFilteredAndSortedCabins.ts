import { useSearchParams } from 'react-router-dom';

import { CabinAttributes } from '../../services/types';
import {
  SearchParamsDiscountValuesForCabins,
  SearchParamsNamesForCabins,
  SearchParamsSortValuesForCabins,
} from './config';

export function useFilteredAndSortedCabins(
  cabins: CabinAttributes[] | null | undefined,
): CabinAttributes[] {
  const [searchParams] = useSearchParams();

  if (!cabins) return [];

  let filteredCabins = cabins;
  if (
    searchParams.get(SearchParamsNamesForCabins.Discount) ===
    SearchParamsDiscountValuesForCabins.All
  )
    filteredCabins = cabins;
  if (
    searchParams.get(SearchParamsNamesForCabins.Discount) ===
    SearchParamsDiscountValuesForCabins.NoDiscount
  )
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (
    searchParams.get(SearchParamsNamesForCabins.Discount) ===
    SearchParamsDiscountValuesForCabins.WithDiscount
  )
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //
  //
  //
  let sortedCabins = filteredCabins;
  if (
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.NameAscending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.NameDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  if (
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.CapacityAscending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.CapacityDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.PriceAscending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.PriceDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.regularPrice - b.regularPrice);
  if (
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.DiscountAscending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.DiscountDescending
  )
    sortedCabins = sortedCabins.slice().sort((a, b) => a.discount - b.discount);

  if (
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.NameDescending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.CapacityDescending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.PriceDescending ||
    searchParams.get(SearchParamsNamesForCabins.Sort) ===
      SearchParamsSortValuesForCabins.DiscountDescending
  )
    sortedCabins = sortedCabins.slice().reverse();

  return sortedCabins;
}
