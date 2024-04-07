import { Filter } from '../../ui/Filter';
import { SortBy } from '../../ui/SortBy';
import { TableOperations } from '../../ui/TableOperations';
import {
  SearchParamsNamesForBookings,
  SearchParamsSortValuesForBookings,
  SearchParamsStatusValuesForBookings,
} from './config';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        searchParamName={SearchParamsNamesForBookings.Status}
        buttonProperties={[
          { value: SearchParamsStatusValuesForBookings.All, label: 'All' },
          {
            value: SearchParamsStatusValuesForBookings.CheckedIn,
            label: 'Checked in',
          },
          {
            value: SearchParamsStatusValuesForBookings.CheckedOut,
            label: 'Checked out',
          },
          {
            value: SearchParamsStatusValuesForBookings.Unconfirmed,
            label: 'Unconfirmed',
          },
        ]}
      />

      <SortBy
        searchParamName={SearchParamsNamesForBookings.Sort}
        selectOptions={[
          {
            value: SearchParamsSortValuesForBookings.DateDescending,
            label: 'Sort by date (Descending)',
          },
          {
            value: SearchParamsSortValuesForBookings.DateAscending,
            label: 'Sort by date (Ascending)',
          },
          {
            value: SearchParamsSortValuesForBookings.TotalPriceDescending,
            label: 'Total Price (Descending)',
          },
          {
            value: SearchParamsSortValuesForBookings.TotalPriceAscending,
            label: 'Total Price (Ascending)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
