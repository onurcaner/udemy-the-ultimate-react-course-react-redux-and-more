import { BiLoaderAlt } from 'react-icons/bi';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

export const SpinnerMini = styled(BiLoaderAlt)`
  width: 1.5rem;
  height: 1.5rem;
  animation: ${rotate} 1.6s infinite linear;
`;
