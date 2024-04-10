import styled from 'styled-components';

export const ButtonIcon = styled.button`
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration) ease-in-out();

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-brand-600);
  }
`;
