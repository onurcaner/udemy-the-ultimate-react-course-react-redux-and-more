import styled from 'styled-components';

import { BookingTable } from '../features/bookings/BookingTable';
import { Heading } from '../ui/Heading';

export function Bookings(): JSX.Element {
  return (
    <>
      <StyledFlexRow>
        <Heading as="h2">All bookings</Heading>
        <p>TEST</p>
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
