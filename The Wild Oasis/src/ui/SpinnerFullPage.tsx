import styled from 'styled-components';

import { Spinner } from './Spinner';

export function SpinnerFullPage(): JSX.Element {
  return (
    <StyledDiv>
      <Spinner />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;

  width: 100%;
  height: 100vh;
  height: 100dvh;
`;
