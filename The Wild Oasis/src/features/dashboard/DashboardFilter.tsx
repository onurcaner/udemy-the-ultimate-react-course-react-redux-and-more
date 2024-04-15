import { Filter } from '../../ui/Filter';
import {
  SearchParamsLastDaysValuesForDashboard,
  SearchParamsNamesForDashboard,
} from './config';

export function DashboardFilter(): JSX.Element {
  return (
    <Filter
      searchParamName={SearchParamsNamesForDashboard.LastDays}
      buttonProperties={[
        {
          value: SearchParamsLastDaysValuesForDashboard.Day7,
          label: 'Last 7 days',
        },
        {
          value: SearchParamsLastDaysValuesForDashboard.Day30,
          label: 'Last 30 days',
        },
        {
          value: SearchParamsLastDaysValuesForDashboard.Day90,
          label: 'Last 90 days',
        },
      ]}
    />
  );
}
