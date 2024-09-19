import type { JSX } from 'react';

import { Filter } from '@/app/_components/Filter';
import {
  CabinsSearchCapacityValues,
  CabinsSearchFields,
} from '@/app/cabins/_query';

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
