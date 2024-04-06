import styled from 'styled-components';

import { BookingTable } from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import { Heading } from '../ui/Heading';

export function Bookings(): JSX.Element {
  return (
    <>
      <StyledFlexRow>
        <Heading as="h2">All bookings</Heading>
        <BookingTableOperations />
      </StyledFlexRow>

      <BookingTable />
    </>
  );
}

const StyledFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
