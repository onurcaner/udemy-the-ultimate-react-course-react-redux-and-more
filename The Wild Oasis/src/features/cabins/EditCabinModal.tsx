import { CabinAttributes } from '../../services/types';
import { Modal } from '../../ui/Modal';
import { CabinForm } from './CabinForm';

export function EditCabinModal({
  children,
  cabin,
}: {
  children: JSX.Element;
  cabin: CabinAttributes;
}): JSX.Element {
  const windowName = `EditCabinModal_${cabin.id}`;

  return (
    <>
      <Modal.ButtonContainer windowNameFor={windowName}>
        {children}
      </Modal.ButtonContainer>

      <Modal.Window windowName={windowName}>
        <CabinForm cabin={cabin} />
      </Modal.Window>
    </>
  );
}
