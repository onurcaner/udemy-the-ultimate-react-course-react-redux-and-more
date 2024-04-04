import { MouseEventHandler, useContext } from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { Heading } from './Heading';
import { Modal } from './Modal';

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 0.75rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

export function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
}: {
  resourceName: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}): JSX.Element {
  const { closeWindow } = useContext(Modal.Context);

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={closeWindow}
        >
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
