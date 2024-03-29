import styled from 'styled-components';

import { Logo } from './Logo';
import { SidebarNav } from './SidebarNav';

export function Sidebar(): JSX.Element {
  return (
    <StyledAside>
      <Logo />
      <SidebarNav />
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  grid-row: 1 / -1;
  display: grid;
  grid-auto-rows: max-content;
  row-gap: 4rem;
  padding: 4rem 2rem;
  border-right: 1px solid var(--color-grey-100);
`;
