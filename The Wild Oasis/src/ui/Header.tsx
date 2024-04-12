import styled from 'styled-components';

import { UserAvatar } from '../features/authentication/UserAvatar';
import { HeaderMenu } from './HeaderMenu';

export function Header(): JSX.Element {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: end;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
