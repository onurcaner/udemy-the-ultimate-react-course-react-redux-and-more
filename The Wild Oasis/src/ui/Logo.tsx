import styled from 'styled-components';

export function Logo(): JSX.Element {
  return (
    <StyledDiv>
      <StyledImg
        src="/logos/logo-light.png"
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
