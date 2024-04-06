import styled from 'styled-components';

export const ButtonText = styled.button`
  font-weight: 500;
  text-align: center;
  color: var(--color-brand-600);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration) ease-in-out();

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;
