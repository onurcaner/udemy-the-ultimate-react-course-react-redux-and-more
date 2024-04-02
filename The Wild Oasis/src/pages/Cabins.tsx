import styled from 'styled-components';

import { CabinForm } from '../features/cabins/CabinForm';
import { CabinTable } from '../features/cabins/CabinTable';
import { Heading } from '../ui/Heading';

export function Cabins(): JSX.Element {
  return (
    <>
      <StyledFlexRow>
        <Heading as="h2">All cabins</Heading>
        <p>Filter / Sort</p>
      </StyledFlexRow>

      <CabinTable />

      <CabinForm />
    </>
  );
}

const StyledFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
