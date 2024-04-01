import styled from 'styled-components';

import { CabinTable } from '../features/cabins/CabinTable';
import { CreateCabinForm } from '../features/cabins/CreateCabinForm';
import { Heading } from '../ui/Heading';

export function Cabins(): JSX.Element {
  return (
    <>
      <StyledFlexRow>
        <Heading as="h2">All cabins</Heading>
        <p>Filter / Sort</p>
      </StyledFlexRow>

      <CabinTable />

      <CreateCabinForm />
    </>
  );
}

const StyledFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
