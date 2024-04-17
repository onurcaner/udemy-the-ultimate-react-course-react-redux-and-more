import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

import { BookingAttributesExtended } from '../../services/types';
import { Empty } from '../../ui/Empty';
import { Heading } from '../../ui/Heading';
import { Spinner } from '../../ui/Spinner';
import { useContextDarkMode } from '../dark-mode/useContextDarkMode';
import { filterStaysFromBooking } from './filterStaysFromBooking';
import { useQueryBookingsAfterDate } from './useQueryBookingsAfterDate';

interface DataPoint {
  duration:
    | '1 night'
    | '2 nights'
    | '3 nights'
    | '4-5 nights'
    | '6-7 nights'
    | '8-14 nights'
    | '15-21 nights'
    | '21+ nights';
  value: number;
  color: string;
}

enum DataPointKeys {
  Duration = 'duration',
  Value = 'value',
  Color = 'color',
}

export function DurationChart(): JSX.Element {
  const { isDarkMode } = useContextDarkMode();
  const { isPending, data: bookingsAfterDate } = useQueryBookingsAfterDate();

  if (isPending) return <Spinner />;
  if (!bookingsAfterDate) return <Empty resourceName="bookings" />;

  const dataPoints = prepareData(
    isDarkMode ? startDataDark() : startDataLight(),
    bookingsAfterDate.filter(filterStaysFromBooking),
  );

  return (
    <StyledChartBox>
      {<Heading as="h3">Summary of stays&apos; durations</Heading>}

      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey={DataPointKeys.Value}
            data={dataPoints}
            nameKey={DataPointKeys.Duration}
            legendType="cross"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
          >
            {dataPoints.map((entry) => (
              <Cell key={Math.random()} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledChartBox>
  );
}

function prepareData(
  startData: DataPoint[],
  stays: BookingAttributesExtended[],
): DataPoint[] {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  const incArrayValue = (arr: DataPoint[], field: string) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  };

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.nights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function startDataLight(): DataPoint[] {
  return [
    {
      duration: '1 night',
      value: 0,
      color: '#ef4444',
    },
    {
      duration: '2 nights',
      value: 0,
      color: '#f97316',
    },
    {
      duration: '3 nights',
      value: 0,
      color: '#eab308',
    },
    {
      duration: '4-5 nights',
      value: 0,
      color: '#84cc16',
    },
    {
      duration: '6-7 nights',
      value: 0,
      color: '#22c55e',
    },
    {
      duration: '8-14 nights',
      value: 0,
      color: '#14b8a6',
    },
    {
      duration: '15-21 nights',
      value: 0,
      color: '#3b82f6',
    },
    {
      duration: '21+ nights',
      value: 0,
      color: '#a855f7',
    },
  ];
}

function startDataDark(): DataPoint[] {
  return [
    {
      duration: '1 night',
      value: 0,
      color: '#b91c1c',
    },
    {
      duration: '2 nights',
      value: 0,
      color: '#c2410c',
    },
    {
      duration: '3 nights',
      value: 0,
      color: '#a16207',
    },
    {
      duration: '4-5 nights',
      value: 0,
      color: '#4d7c0f',
    },
    {
      duration: '6-7 nights',
      value: 0,
      color: '#15803d',
    },
    {
      duration: '8-14 nights',
      value: 0,
      color: '#0f766e',
    },
    {
      duration: '15-21 nights',
      value: 0,
      color: '#1d4ed8',
    },
    {
      duration: '21+ nights',
      value: 0,
      color: '#7e22ce',
    },
  ];
}

const StyledChartBox = styled.div`
  grid-column: 3 / span 2;

  display: grid;
  grid-template-rows: max-content 1fr;

  padding: 1.5rem 2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
