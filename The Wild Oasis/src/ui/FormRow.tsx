import { ReactNode } from 'react';
import styled from 'styled-components';

export interface FormRowProps {
  children: ReactNode;
  label?: string;
  htmlFor?: string;
  errorMessage?: string | null;
}

export function FormRow({
  children,
  label,
  htmlFor,
  errorMessage,
}: FormRowProps): JSX.Element {
  return (
    <StyledFormRow>
      {label && <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>}
      {children}
      {errorMessage && <StyledSpan role="alert">{errorMessage}</StyledSpan>}
    </StyledFormRow>
  );
}

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 1fr 1.25fr;
  gap: 1.5rem;
  padding-block: 0.75rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

const StyledLabel = styled.label`
  font-weight: 500;
`;

const StyledSpan = styled.span`
  font-size: 0.85rem;
  color: var(--color-red-700);
`;
