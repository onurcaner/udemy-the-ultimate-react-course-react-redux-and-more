import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

export const Spinner = styled.div`
  width: 4rem;
  aspect-ratio: 1;
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/0.75rem 0.75rem no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  mask: radial-gradient(farthest-side, #0000 calc(100% - 0.75rem), #000 0);
  border-radius: 50%;
  margin: 4rem auto;
  animation: ${rotate} 1.6s infinite linear;
`;
