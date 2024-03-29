import styled from 'styled-components';

import { useNavigateBack } from '../hooks/useNavigateBack';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';

export function PageNotFound(): JSX.Element {
  const navigateBack = useNavigateBack();

  return (
    <StyledMain>
      <Box>
        <Heading as="h2">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={navigateBack} $size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100dvh;
  padding: 4rem;
  background-color: var(--color-grey-50);
`;

const Box = styled.div`
  text-align: center;
  padding: 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  h2 {
    text-transform: none;
  }
`;
