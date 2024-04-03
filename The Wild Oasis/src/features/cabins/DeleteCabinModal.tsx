import { MouseEventHandler } from 'react';

import { CabinAttributes } from '../../services/types';
import { ConfirmDelete } from '../../ui/ConfirmDelete';
import { Modal } from '../../ui/Modal';

export function DeleteCabinModal({
  children,
  cabin,
  disabled,
  onConfirm,
}: {
  children: JSX.Element;
  cabin: CabinAttributes;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}): JSX.Element {
  return (
    <Modal.Provider>
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>

      <Modal.Window>
        <ConfirmDelete
          resourceName={cabin.name}
          disabled={disabled}
          onConfirm={onConfirm}
        />
      </Modal.Window>
    </Modal.Provider>
  );
}
