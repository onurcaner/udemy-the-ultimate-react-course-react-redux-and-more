import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { getCabins } from '../../services/apiCabins';
import { Spinner } from '../../ui/Spinner';
import { CabinTableRow } from './CabinTableRow';

export function CabinTable(): JSX.Element {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });

  if (isLoading) return <Spinner />;

  if (!cabins) return <></>;

  return (
    <StyledTable role="table">
      <StyledTableHeader role="row">
        <div role="cell"></div>
        <div role="cell">Cabin</div>
        <div role="cell">Capacity</div>
        <div role="cell">Price</div>
        <div role="cell">Discount</div>
        <div role="cell"></div>
      </StyledTableHeader>
      {cabins.map((cabin) => (
        <CabinTableRow cabin={cabin} key={cabin.id} />
      ))}
    </StyledTable>
  );
}

const StyledTable = styled.div`
  font-size: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const StyledTableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.625fr 1.7fr 2.25fr 1fr 1fr 1fr;
  align-items: center;
  column-gap: 2rem;

  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
  padding: 1rem 2rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;
