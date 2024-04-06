import { Filter } from '../../ui/Filter';
import { SortBy } from '../../ui/SortBy';
import { TableOperations } from '../../ui/TableOperations';
import {
  SearchParamsDiscountValuesForCabins,
  SearchParamsNamesForCabins,
  SearchParamsSortValuesForCabins,
} from './config';

export function CabinTableOperations(): JSX.Element {
  return (
    <TableOperations>
      <Filter
        searchParamName={SearchParamsNamesForCabins.Discount}
        buttonProperties={[
          { label: 'All', value: SearchParamsDiscountValuesForCabins.All },
          {
            label: 'With discount',
            value: SearchParamsDiscountValuesForCabins.WithDiscount,
          },
          {
            label: 'No discount',
            value: SearchParamsDiscountValuesForCabins.NoDiscount,
          },
        ]}
      />

      <SortBy
        searchParamName={SearchParamsNamesForCabins.Sort}
        selectOptions={[
          {
            label: 'Sort by name (Ascending)',
            value: SearchParamsSortValuesForCabins.NameAscending,
          },
          {
            label: 'Sort by name (Descending)',
            value: SearchParamsSortValuesForCabins.NameDescending,
          },
          {
            label: 'Sort by capacity (Ascending)',
            value: SearchParamsSortValuesForCabins.CapacityAscending,
          },
          {
            label: 'Sort by capacity (Descending)',
            value: SearchParamsSortValuesForCabins.CapacityDescending,
          },
          {
            label: 'Sort by price (Ascending)',
            value: SearchParamsSortValuesForCabins.PriceAscending,
          },
          {
            label: 'Sort by price (Descending)',
            value: SearchParamsSortValuesForCabins.PriceDescending,
          },
          {
            label: 'Sort by discount (Ascending)',
            value: SearchParamsSortValuesForCabins.DiscountAscending,
          },
          {
            label: 'Sort by discount (Descending)',
            value: SearchParamsSortValuesForCabins.DiscountDescending,
          },
        ]}
      />
    </TableOperations>
  );
}
