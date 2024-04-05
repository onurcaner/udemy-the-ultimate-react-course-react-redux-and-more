import styled from 'styled-components';

import { Spinner } from '../../ui/Spinner';
import { Table } from '../../ui/Table';
import { BookingRow } from './BookingRow';
import { useQueryBookings } from './useQueryBookings';

export function BookingTable(): JSX.Element {
  const { data: extendedBookings, isLoading } = useQueryBookings();

  if (isLoading) return <Spinner />;

  if (!extendedBookings) return <></>;

  return (
    <Table.Provider templateColumns="0.5fr 1fr 1fr 0.5fr 0.5fr 0.25fr">
      <Table.HeaderRow>
        <StyledTh>Cabin</StyledTh>
        <StyledTh>Guest</StyledTh>
        <StyledTh>Dates</StyledTh>
        <StyledTh>Status</StyledTh>
        <StyledTh>Amount</StyledTh>
        <StyledTh></StyledTh>
      </Table.HeaderRow>

      <Table.Body
        items={extendedBookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table.Provider>
  );
}

const StyledTh = styled.th`
  display: block;
`;
