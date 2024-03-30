import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

import { deleteCabin } from '../../services/apiCabins';
import { CabinAttributes } from '../../services/types';
import { Button } from '../../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

export interface CabinTableRowProps {
  cabin: CabinAttributes;
}

export function CabinTableRow({ cabin }: CabinTableRowProps): JSX.Element {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  const handleClickToDeleteCabin: MouseEventHandler<HTMLButtonElement> = () => {
    mutate(cabin.id);
  };

  return (
    <TableRow role="row">
      <Img src={cabin.imageUrl} alt={cabin.description} />
      <Cabin role="cell">{cabin.name}</Cabin>
      <div role="cell">For up to {cabin.maxCapacity} guests</div>
      <Price role="cell">{formatCurrency(cabin.regularPrice)}</Price>
      <Discount role="cell">
        {cabin.discount ? formatCurrency(cabin.discount) : '-'}
      </Discount>
      <Button
        $variation="danger"
        $size="small"
        type="button"
        onClick={handleClickToDeleteCabin}
        disabled={isPending}
      >
        Delete
      </Button>
    </TableRow>
  );
}

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.625fr 1.7fr 2.25fr 1fr 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-0.375rem);
  border-radius: var(--border-radius-sm);
`;

const Cabin = styled.div`
  font-family: 'Sono';
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
