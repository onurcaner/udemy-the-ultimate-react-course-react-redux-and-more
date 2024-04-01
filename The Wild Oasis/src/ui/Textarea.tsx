import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  resize: vertical;

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
