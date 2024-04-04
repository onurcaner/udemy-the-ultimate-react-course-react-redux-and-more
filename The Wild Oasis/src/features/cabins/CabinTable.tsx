import styled from 'styled-components';

import { Spinner } from '../../ui/Spinner';
import { Table } from '../../ui/Table';
import { CabinTableRow } from './CabinTableRow';
import { useFilteredAndSortedCabins } from './useFilteredAndSortedCabins';
import { useQueryCabins } from './useQueryCabins';

export function CabinTable(): JSX.Element {
  const { data: cabins, isLoading } = useQueryCabins();
  const filteredAndSortedCabins = useFilteredAndSortedCabins(cabins);

  if (isLoading) return <Spinner />;

  return (
    <Table.Provider templateColumns="0.5fr 1fr 1fr 0.5fr 0.5fr 0.25fr">
      <Table.HeaderRow>
        <StyledTh></StyledTh>
        <StyledTh>Cabin</StyledTh>
        <StyledTh>Capacity</StyledTh>
        <StyledTh>Price</StyledTh>
        <StyledTh>Discount</StyledTh>
        <StyledTh></StyledTh>
      </Table.HeaderRow>

      <Table.Body
        items={filteredAndSortedCabins}
        render={(cabin) => <CabinTableRow cabin={cabin} key={cabin.id} />}
      />
    </Table.Provider>
  );
}

const StyledTh = styled.th`
  display: block;
`;
