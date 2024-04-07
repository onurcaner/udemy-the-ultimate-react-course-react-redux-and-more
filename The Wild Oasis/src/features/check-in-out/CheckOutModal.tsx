import { useContext } from 'react';
import styled from 'styled-components';

import { Button } from '../../ui/Button';
import { ButtonGroup } from '../../ui/ButtonGroup';
import { Heading } from '../../ui/Heading';
import { Modal } from '../../ui/Modal';
import { CheckOutButton } from './CheckOutButton';

export function CheckOutModal({
  children,
  bookingId,
}: {
  children: JSX.Element;
  bookingId: number;
}): JSX.Element {
  return (
    <Modal.Provider>
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>
      <Modal.Window>
        <StyledContainer>
          <Heading as="h3">
            Are you sure to check out booking #{bookingId}
          </Heading>
          <ButtonGroup>
            <CloseModalButton />
            <CheckOutButton bookingId={bookingId}>Check out</CheckOutButton>
          </ButtonGroup>
        </StyledContainer>
      </Modal.Window>
    </Modal.Provider>
  );
}

function CloseModalButton(): JSX.Element {
  const { closeWindow } = useContext(Modal.Context);

  return (
    <Button $variation="secondary" onClick={closeWindow}>
      Cancel
    </Button>
  );
}

const StyledContainer = styled.div`
  padding: 2rem 4rem;
`;
