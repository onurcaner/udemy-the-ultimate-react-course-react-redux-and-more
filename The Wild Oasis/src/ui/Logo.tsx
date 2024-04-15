import styled from 'styled-components';

import { useContextDarkMode } from '../features/dark-mode/useContextDarkMode';

export function Logo(): JSX.Element {
  const { isDarkMode } = useContextDarkMode();

  return (
    <StyledDiv>
      <StyledImg
        src={`/logos/logo-${isDarkMode ? 'dark' : 'light'}.png`}
        alt="The Wild Oasis logo"
        width="300"
        height="213"
      />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;

const StyledImg = styled.img`
  height: 6rem;
`;
