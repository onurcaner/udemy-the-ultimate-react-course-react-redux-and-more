import styled from 'styled-components';

import { Heading } from './Heading';

export function ErrorFallback({ error }: { error: Error }): JSX.Element {
  return (
    <StyledErrorFallback>
      <StyledBox>
        <Heading as="h1">Something went wrong</Heading>
        <p>{error.message}</p>
        <p>{error.stack}</p>
      </StyledBox>
    </StyledErrorFallback>
  );
}

const StyledErrorFallback = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  padding: 3rem;
  background-color: var(--color-grey-50);
`;

const StyledBox = styled.div`
  flex: 0 1 96rem;
  text-align: center;

  padding: 4.8rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & p {
    font-family: 'Sono';
    color: var(--color-grey-500);
    margin-bottom: 3.2rem;
  }
`;
