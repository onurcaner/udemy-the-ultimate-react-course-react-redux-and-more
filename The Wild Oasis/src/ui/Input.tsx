import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  outline: transparent solid 0.25rem;
  transition: all var(--transition-duration) ease-in-out;

  &:focus-visible {
    outline-color: var(--color-brand-600);
    outline-offset: -0.125rem;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
