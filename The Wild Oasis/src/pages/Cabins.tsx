import styled from 'styled-components';

import { AddCabinModal } from '../features/cabins/AddCabinModal';
import { CabinTable } from '../features/cabins/CabinTable';
import { CabinTableOperations } from '../features/cabins/CabinTableOperations';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';

export function Cabins(): JSX.Element {
  return (
    <>
      <StyledFlexRow>
        <Heading as="h2">All cabins</Heading>
        <CabinTableOperations />
      </StyledFlexRow>

      <StyledDiv>
        <CabinTable />
      </StyledDiv>

      <AddCabinModal>
        <Button>Add Cabin</Button>
      </AddCabinModal>
    </>
  );
}

const StyledFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDiv = styled.div`
  margin-bottom: 2rem;
`;
