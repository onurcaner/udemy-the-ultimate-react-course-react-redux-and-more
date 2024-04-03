import styled from 'styled-components';

import { Spinner } from '../../ui/Spinner';
import { Table } from '../../ui/Table';
import { CabinTableRow } from './CabinTableRow';
import { useQueryCabins } from './useQueryCabins';

export function CabinTable(): JSX.Element {
  const { data: cabins, isLoading } = useQueryCabins();

  if (isLoading) return <Spinner />;

  if (!cabins) return <></>;

  return (
    <Table.Provider templateColumns="1fr 1fr 1fr 0.5fr 0.5fr 1fr">
      <Table.HeaderRow>
        <StyledTh></StyledTh>
        <StyledTh>Cabin</StyledTh>
        <StyledTh>Capacity</StyledTh>
        <StyledTh>Price</StyledTh>
        <StyledTh>Discount</StyledTh>
        <StyledTh></StyledTh>
      </Table.HeaderRow>

      <Table.Body
        items={cabins}
        render={(cabin) => <CabinTableRow cabin={cabin} key={cabin.id} />}
      />
    </Table.Provider>
  );
}

const StyledTh = styled.th`
  display: block;
`;
