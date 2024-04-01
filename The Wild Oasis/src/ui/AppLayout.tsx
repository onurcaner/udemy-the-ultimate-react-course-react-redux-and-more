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
        <StyledContainer>
          <Outlet />
        </StyledContainer>
      </StyledMain>
    </StyledGrid>
  );
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: max-content 1fr;
  height: 100vh;
  height: 100dvh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  overflow-y: scroll;
`;

const StyledContainer = styled.div`
  padding: 4rem;
  max-width: 120rem;
  margin-inline: auto;
`;
