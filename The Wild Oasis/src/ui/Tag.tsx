import styled from 'styled-components';

export const Tag = styled.span<{
  $variant:
    | 'brand'
    | 'grey'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'silver';
}>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-${(props) => props.$variant}-700);
  width: fit-content;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-${(props) => props.$variant}-100);
  border-radius: 5rem;
`;
