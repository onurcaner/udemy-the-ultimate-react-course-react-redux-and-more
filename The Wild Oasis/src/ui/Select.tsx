import styled from 'styled-components';

export const Select = styled.select<{ $variant?: 'light' }>`
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid
    ${(props) =>
      props.$variant === 'light'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;
