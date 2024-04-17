import styled from 'styled-components';

import { Empty } from '../../ui/Empty';
import { Heading } from '../../ui/Heading';
import { Spinner } from '../../ui/Spinner';
import { TodaysActivityItem } from './TodaysActivityItem';
import { useQueryBookingsTodaysActivities } from './useQueryBookingsTodaysActivities';

export function TodaysActivities(): JSX.Element {
  const { isPending, data: bookings } = useQueryBookingsTodaysActivities();

  if (isPending) return <Spinner />;
  if (!bookings) return <Empty resourceName="bookings" />;

  return (
    <StyledToday>
      <Heading as="h3">Today&apos;s activities</Heading>
      {bookings.length > 0 && (
        <StyledList>
          {bookings.map((booking) => (
            <TodaysActivityItem booking={booking} key={booking.id} />
          ))}
        </StyledList>
      )}
      {bookings.length === 0 && (
        <StyledNoActivity>No activities for today</StyledNoActivity>
      )}
    </StyledToday>
  );
}

const StyledToday = styled.div`
  grid-column: 1 / span 2;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const StyledList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StyledNoActivity = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
`;
