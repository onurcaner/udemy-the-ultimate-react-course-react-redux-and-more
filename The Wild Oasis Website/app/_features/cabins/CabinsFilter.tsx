import {
  CabinsSearchCapacityValues,
  CabinsSearchFields,
} from '../../cabins/_query';
import { Filter } from '@/app/_components/Filter';

export function CabinsFilter(): JSX.Element {
  return (
    <Filter
      searchField={CabinsSearchFields.Capacity}
      defaultSearchValue={CabinsSearchCapacityValues.All}
      searchValuesAndLabels={[
        {
          label: 'All',
          value: CabinsSearchCapacityValues.All,
        },
        {
          label: '1-3 guests',
          value: CabinsSearchCapacityValues.Small,
        },
        {
          label: '4-7 guests',
          value: CabinsSearchCapacityValues.Medium,
        },
        {
          label: '8-12 guests',
          value: CabinsSearchCapacityValues.Large,
        },
      ]}
    />
  );
}
