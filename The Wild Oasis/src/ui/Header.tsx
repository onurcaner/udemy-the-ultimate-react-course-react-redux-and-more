import styled from 'styled-components';

export function Header(): JSX.Element {
  return <StyledHeader>HEADER</StyledHeader>;
}

const StyledHeader = styled.header`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
