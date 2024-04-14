import { MouseEventHandler } from 'react';
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from 'react-icons/hi2';
import styled from 'styled-components';

import { CabinAttributes } from '../../services/types';
import { Menu } from '../../ui/Menu';
import { Table } from '../../ui/Table';
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
    <Table.Row>
      <StyledTd>
        <StyledImg src={cabin.imageUrl} alt={cabin.name} />
      </StyledTd>

      <StyledCabin>{cabin.name}</StyledCabin>

      <StyledTd>For up to {cabin.maxCapacity} guests</StyledTd>

      <StyledPrice>{formatCurrency(cabin.regularPrice)}</StyledPrice>

      <StyledDiscount>
        {cabin.discount ? formatCurrency(cabin.discount) : '-'}
      </StyledDiscount>

      {/* <StyledButtonsContainer>
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
      </StyledButtonsContainer> */}
      <StyledTd>
        <Menu.Provider>
          <Menu.OpenButton />
          <Menu.List>
            <Menu.ListItem>
              <button
                type="button"
                onClick={handleClickToDuplicateCabin}
                disabled={isPending}
              >
                <StyledIconContainer aria-hidden={true}>
                  <HiOutlineSquare2Stack />
                </StyledIconContainer>
                <span>Duplicate cabin</span>
              </button>
            </Menu.ListItem>

            <Menu.ListItem>
              <EditCabinModal cabin={cabin}>
                <button type="button" disabled={isPending}>
                  <StyledIconContainer aria-hidden={true}>
                    <HiOutlinePencil />
                  </StyledIconContainer>
                  <span>Edit Cabin</span>
                </button>
              </EditCabinModal>
            </Menu.ListItem>

            <Menu.ListItem>
              <DeleteCabinModal
                cabin={cabin}
                disabled={isPending}
                onConfirm={handleClickToDeleteCabin}
              >
                <button type="button" disabled={isPending}>
                  <StyledIconContainer aria-hidden={true}>
                    <HiOutlineTrash />
                  </StyledIconContainer>
                  <span>Delete Cabin</span>
                </button>
              </DeleteCabinModal>
            </Menu.ListItem>
          </Menu.List>
        </Menu.Provider>
      </StyledTd>
    </Table.Row>
  );
}

const StyledTd = styled.td`
  display: block;
`;

const StyledImg = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
`;

const StyledCabin = styled.td`
  display: block;
  font-family: 'Sono';
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledPrice = styled.td`
  display: block;
  font-family: 'Sono';
  font-weight: 600;
`;

const StyledDiscount = styled.td`
  display: block;
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledIconContainer = styled.span`
  font-size: 1.25rem;
`;
