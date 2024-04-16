import styled from 'styled-components';

import { DurationChart } from './DurationChart';
import { SalesChart } from './SalesChart';
import { Stats } from './Stats';

export function DashboardLayout(): JSX.Element {
  return (
    <StyledDashboardLayout>
      <Stats />
      <div>Todays activities</div>
      <DurationChart />
      <SalesChart />
    </StyledDashboardLayout>
  );
}

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 32rem auto;
  gap: 1.5rem;
`;
