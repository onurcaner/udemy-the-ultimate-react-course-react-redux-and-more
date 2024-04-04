import { Filter } from '../../ui/Filter';
import { SortBy } from '../../ui/SortBy';
import { ParamDiscountValues, ParamNames, ParamSortValues } from './config';

export function CabinTableOperations(): JSX.Element {
  return (
    <>
      <Filter
        searchParamName={ParamNames.Discount}
        buttonProperties={[
          { label: 'All', value: ParamDiscountValues.All },
          { label: 'With discount', value: ParamDiscountValues.WithDiscount },
          { label: 'No discount', value: ParamDiscountValues.NoDiscount },
        ]}
      />

      <SortBy
        searchParamName={ParamNames.Sort}
        selectOptions={[
          {
            label: 'Sort by name (Ascending)',
            value: ParamSortValues.NameAscending,
          },
          {
            label: 'Sort by name (Descending)',
            value: ParamSortValues.NameDescending,
          },
          {
            label: 'Sort by capacity (Ascending)',
            value: ParamSortValues.CapacityAscending,
          },
          {
            label: 'Sort by capacity (Descending)',
            value: ParamSortValues.CapacityDescending,
          },
          {
            label: 'Sort by price (Ascending)',
            value: ParamSortValues.PriceAscending,
          },
          {
            label: 'Sort by price (Descending)',
            value: ParamSortValues.PriceDescending,
          },
          {
            label: 'Sort by discount (Ascending)',
            value: ParamSortValues.DiscountAscending,
          },
          {
            label: 'Sort by discount (Descending)',
            value: ParamSortValues.DiscountDescending,
          },
        ]}
      />
    </>
  );
}
