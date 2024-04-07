import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1rem;

  & input[type='checkbox'] {
    order: 1;
    height: 1.5rem;
    width: 1.5rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
    transition: all var(--transition-duration) ease-in-out;
    cursor: pointer;
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
    cursor: default;
  }

  & label {
    order: 2;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  &:has(:disabled) label {
    cursor: default;
  }
`;

export function Checkbox({ children }: { children: ReactNode }) {
  return <StyledCheckbox>{children}</StyledCheckbox>;
}
