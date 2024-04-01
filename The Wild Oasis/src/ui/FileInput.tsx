import styled from 'styled-components';

export const FileInput = styled.input`
  font-size: 0.85rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    color: var(--color-brand-50);
    padding: 5rem 1rem;
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
`;
