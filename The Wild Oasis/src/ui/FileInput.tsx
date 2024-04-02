import styled from 'styled-components';

export const FileInput = styled.input`
  font-size: 0.85rem;
  border-radius: var(--border-radius-sm);
  outline: transparent solid 0.25rem;
  transition: all var(--transition-duration) ease-in-out;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    color: var(--color-brand-50);
    padding: 0.5rem 1rem;
    background-color: var(--color-brand-600);
    border: none;
    border-radius: var(--border-radius-sm);
    margin-right: 0.75rem;
    transition: all var(--transition-duration) ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &:focus-visible {
    outline-offset: -0.125rem;
    outline-color: var(--color-brand-700);

    &::file-selector-button {
      background-color: var(--color-brand-700);
    }
  }
`;
