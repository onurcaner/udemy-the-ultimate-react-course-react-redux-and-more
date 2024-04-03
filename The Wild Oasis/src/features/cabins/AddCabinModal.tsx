import { Modal } from '../../ui/Modal';
import { CabinForm } from './CabinForm';

export function AddCabinModal({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <Modal.Provider>
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>

      <Modal.Window>
        <CabinForm />
      </Modal.Window>
    </Modal.Provider>
  );
}
