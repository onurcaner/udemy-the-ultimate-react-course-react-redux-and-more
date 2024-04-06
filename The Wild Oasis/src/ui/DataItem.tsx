import { ReactNode } from 'react';
import styled from 'styled-components';

export function DataItem({
  children,
  label,
  icon,
}: {
  children: ReactNode;
  label: string;
  icon: JSX.Element;
}): JSX.Element {
  return (
    <StyledDiv>
      <StyledSpan>
        {icon}
        <span>{label}</span>
      </StyledSpan>
      {children}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.5rem;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-brand-600);
  }
`;
