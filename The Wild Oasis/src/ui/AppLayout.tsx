import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout(): JSX.Element {
  return (
    <StyledGrid>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledGrid>
  );
}

const StyledMain = styled.main`
  padding: 2rem;
  background-color: var(--color-grey-50);
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: max-content 1fr;
  min-height: 100vh;
  min-height: 100dvh;
`;
