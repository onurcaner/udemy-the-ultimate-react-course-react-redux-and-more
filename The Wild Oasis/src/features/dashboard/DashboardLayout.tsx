import styled from 'styled-components';

import { Spinner } from '../../ui/Spinner';
import { filterStaysFromBooking } from './filterStaysFromBooking';
import { useQueryBookingsAfterDate } from './useQueryBookingsAfterDate';

export function DashboardLayout(): JSX.Element {
  const { isPending, data: lastBookings } = useQueryBookingsAfterDate();

  if (isPending) return <Spinner />;
  if (!lastBookings) return <></>;

  const lastStays = lastBookings.filter(filterStaysFromBooking);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Todays activities</div>
      <div>Chart: Stay durations</div>
      <div>Chart: sales</div>
    </StyledDashboardLayout>
  );
}

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 1.5rem;
`;
