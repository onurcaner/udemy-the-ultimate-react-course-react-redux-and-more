import { useSearchParams } from 'react-router-dom';

import { CabinAttributes } from '../../services/types';
import { ParamDiscountValues, ParamNames, ParamSortValues } from './config';

export function useFilteredAndSortedCabins(
  cabins: CabinAttributes[] | null | undefined,
): CabinAttributes[] {
  const [searchParams] = useSearchParams();

  if (!cabins) return [];

  let filteredCabins = cabins;
  if (searchParams.get(ParamNames.Discount) === ParamDiscountValues.All)
    filteredCabins = cabins;
  if (searchParams.get(ParamNames.Discount) === ParamDiscountValues.NoDiscount)
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (
    searchParams.get(ParamNames.Discount) === ParamDiscountValues.WithDiscount
  )
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //
  //
  //
  let sortedCabins = filteredCabins;
  if (
    searchParams.get(ParamNames.Sort) === ParamSortValues.NameAscending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.NameDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  if (
    searchParams.get(ParamNames.Sort) === ParamSortValues.CapacityAscending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.CapacityDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (
    searchParams.get(ParamNames.Sort) === ParamSortValues.PriceAscending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.PriceDescending
  )
    sortedCabins = sortedCabins
      .slice()
      .sort((a, b) => a.regularPrice - b.regularPrice);
  if (
    searchParams.get(ParamNames.Sort) === ParamSortValues.DiscountAscending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.DiscountDescending
  )
    sortedCabins = sortedCabins.slice().sort((a, b) => a.discount - b.discount);

  if (
    searchParams.get(ParamNames.Sort) === ParamSortValues.NameDescending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.CapacityDescending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.PriceDescending ||
    searchParams.get(ParamNames.Sort) === ParamSortValues.DiscountDescending
  )
    sortedCabins = sortedCabins.slice().reverse();

  return sortedCabins;
}
