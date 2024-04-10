import styled from 'styled-components';

import { LogoutButton } from '../features/authentication/LogoutButton';

export function Header(): JSX.Element {
  return (
    <StyledHeader>
      <LogoutButton />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
