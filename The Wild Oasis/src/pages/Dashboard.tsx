import styled from 'styled-components';

import { DashboardFilter } from '../features/dashboard/DashboardFilter';
import { DashboardLayout } from '../features/dashboard/DashboardLayout';
import { Heading } from '../ui/Heading';

export function Dashboard(): JSX.Element {
  return (
    <>
      <StyledDiv>
        <Heading as="h2">Dashboard</Heading>
        <DashboardFilter />
      </StyledDiv>

      <DashboardLayout />
    </>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
