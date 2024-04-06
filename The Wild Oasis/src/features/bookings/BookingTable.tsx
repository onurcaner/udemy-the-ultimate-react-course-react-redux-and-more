import styled from 'styled-components';

import { Empty } from '../../ui/Empty';
import { Pagination } from '../../ui/Pagination';
import { Spinner } from '../../ui/Spinner';
import { Table } from '../../ui/Table';
import { BookingRow } from './BookingRow';
import { useQueryBookingsFilteredSortedPaginatedPrefetched } from './useQueryBookingsFilteredSortedPaginatedPrefetched';

export function BookingTable(): JSX.Element {
  const { data, isLoading } =
    useQueryBookingsFilteredSortedPaginatedPrefetched();

  const { data: extendedBookings, count } = data ?? {};

  if (isLoading) return <Spinner />;

  if (!extendedBookings || extendedBookings.length === 0)
    return <Empty resourceName="bookings" />;

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

      <Table.Footer>
        <Pagination itemsNumber={count ?? 0} />
      </Table.Footer>
    </Table.Provider>
  );
}

const StyledTh = styled.th`
  display: block;
`;
