import { eachDayOfInterval, format, isSameDay, sub } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { Empty } from '../../ui/Empty';
import { Heading } from '../../ui/Heading';
import { Spinner } from '../../ui/Spinner';
import { useContextDarkMode } from '../dark-mode/useContextDarkMode';
import { DashboardBox } from './DashboardBox';
import { filterStaysFromBooking } from './filterStaysFromBooking';
import { useQueryBookingsAfterDate } from './useQueryBookingsAfterDate';
import { useSearchParamsLastDays } from './useSearchParamsLastDays';

interface ChartDataPoint {
  label: string;
  totalSales: number;
  extrasSales: number;
}

enum ChartDataPointKeys {
  Label = 'label',
  TotalSales = 'totalSales',
  ExtrasSales = 'extrasSales',
}

export function SalesChart(): JSX.Element {
  const { isPending, data: bookingsAfterDate } = useQueryBookingsAfterDate();
  const { isDarkMode } = useContextDarkMode();
  const lastDays = +useSearchParamsLastDays();

  if (isPending) return <Spinner />;
  if (!bookingsAfterDate) return <Empty resourceName="bookings" />;

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const staysAfterDate = bookingsAfterDate.filter(filterStaysFromBooking);
  const dates = eachDayOfInterval({
    start: sub(new Date(), { days: lastDays - 1 }),
    end: new Date(),
  });
  const dataPoints: ChartDataPoint[] = dates.map((date): ChartDataPoint => {
    const staysAtDate = staysAfterDate.filter((stay) =>
      isSameDay(date, stay.createdAt),
    );
    return {
      label: format(date, 'd MMM'),
      totalSales: staysAtDate.reduce((sum, stay) => sum + stay.totalPrice, 0),
      extrasSales: staysAtDate.reduce((sum, stay) => sum + stay.extrasPrice, 0),
    };
  });

  console.log(dataPoints);

  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales between {format(dates.at(0) ?? new Date(), 'MMM dd yyyy')} &mdash;{' '}
        {format(dates.at(-1) ?? new Date(), 'MMM dd yyyy')}
      </Heading>

      <ResponsiveContainer>
        <AreaChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey={ChartDataPointKeys.Label}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-grey-100)',
              borderRadius: 'var(--border-radius-md)',
            }}
          />

          <Area
            type="monotone"
            dataKey={ChartDataPointKeys.TotalSales}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />

          <Area
            type="monotone"
            dataKey={ChartDataPointKeys.ExtrasSales}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras' sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height: 32rem;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
