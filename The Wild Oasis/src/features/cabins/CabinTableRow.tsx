import { MouseEventHandler } from 'react';
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from 'react-icons/hi2';
import styled from 'styled-components';

import { CabinAttributes } from '../../services/types';
import { Button } from '../../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { DeleteCabinModal } from './DeleteCabinModal';
import { EditCabinModal } from './EditCabinModal';
import { useMutationCreateCabin } from './useMutationCreateCabin';
import { useMutationDeleteCabin } from './useMutationDeleteCabin';

export interface CabinTableRowProps {
  cabin: CabinAttributes;
}

export function CabinTableRow({ cabin }: CabinTableRowProps): JSX.Element {
  const { isPending: isPendingDeletion, mutate: mutateDeleteCabin } =
    useMutationDeleteCabin(cabin);

  const { isPending: isPendingCreation, mutate: mutateCreateCabin } =
    useMutationCreateCabin();

  const isPending = isPendingDeletion || isPendingCreation;

  const handleClickToDeleteCabin: MouseEventHandler<HTMLButtonElement> = () => {
    mutateDeleteCabin(cabin.id);
  };

  const handleClickToDuplicateCabin: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    mutateCreateCabin({
      description: cabin.description,
      discount: cabin.discount,
      imageUrl: cabin.imageUrl,
      maxCapacity: cabin.maxCapacity,
      name: `Copy of ${cabin.name}`,
      regularPrice: cabin.regularPrice,
    });
  };

  return (
    <>
      <StyledTableRow role="row">
        <StyledImg src={cabin.imageUrl} alt={cabin.description} />

        <StyledCabin role="cell">{cabin.name}</StyledCabin>

        <div role="cell">For up to {cabin.maxCapacity} guests</div>

        <StyledPrice role="cell">
          {formatCurrency(cabin.regularPrice)}
        </StyledPrice>

        <StyledDiscount role="cell">
          {cabin.discount ? formatCurrency(cabin.discount) : '-'}
        </StyledDiscount>

        <StyledButtonsContainer>
          <Button
            $variation="primary"
            $size="small"
            type="button"
            onClick={handleClickToDuplicateCabin}
            disabled={isPending}
            aria-label="Duplicate cabin"
          >
            <StyledIconContainer aria-hidden={true}>
              <HiOutlineSquare2Stack />
            </StyledIconContainer>
          </Button>

          <EditCabinModal cabin={cabin}>
            <Button
              $size="small"
              type="button"
              disabled={isPending}
              aria-label="Edit cabin"
            >
              <StyledIconContainer aria-hidden={true}>
                <HiOutlinePencil />
              </StyledIconContainer>
            </Button>
          </EditCabinModal>

          <DeleteCabinModal
            disabled={isPending}
            onConfirm={handleClickToDeleteCabin}
            cabin={cabin}
          >
            <Button
              $variation="danger"
              $size="small"
              type="button"
              disabled={isPending}
              aria-label="Delete cabin"
            >
              <StyledIconContainer aria-hidden={true}>
                <HiOutlineTrash />
              </StyledIconContainer>
            </Button>
          </DeleteCabinModal>
        </StyledButtonsContainer>
      </StyledTableRow>
    </>
  );
}

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 0.625fr 1.7fr 2.25fr 1fr 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledImg = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.25) translateX(-6.25%);
  border-radius: var(--border-radius-sm);
`;

const StyledCabin = styled.div`
  font-family: 'Sono';
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledPrice = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const StyledDiscount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const StyledIconContainer = styled.span`
  font-size: 1.25rem;
`;
