import { Modal } from '../../ui/Modal';
import { CabinForm } from './CabinForm';

export function AddCabinModal({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const windowName = 'AddCabinModal';

  return (
    <Modal.Provider>
      <Modal.ButtonContainer windowNameFor={windowName}>
        {children}
      </Modal.ButtonContainer>

      <Modal.Window windowName={windowName}>
        <CabinForm />
      </Modal.Window>
    </Modal.Provider>
  );
}
