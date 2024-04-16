import styled from 'styled-components';

type Color = 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'silver';

export function Stat({
  color,
  icon,
  title,
  value,
}: {
  color: Color;
  icon: JSX.Element;
  title: string;
  value: string;
}): JSX.Element {
  return (
    <StyledStat>
      <StyledIconContainer $color={color} aria-hidden={true}>
        {icon}
      </StyledIconContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledValue>{value}</StyledValue>
    </StyledStat>
  );
}

const StyledStat = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;

  padding: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const StyledIconContainer = styled.span<{
  $color: Color;
}>`
  grid-row: 1 / -1;

  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--color-${(props) => props.$color}-100);

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-${(props) => props.$color}-700);
  }
`;

const StyledTitle = styled.h5`
  align-self: end;

  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-500);
`;

const StyledValue = styled.p`
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 500;
`;
