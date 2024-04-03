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
  return (
    <Modal.Provider>
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>

      <Modal.Window>
        <CabinForm cabin={cabin} />
      </Modal.Window>
    </Modal.Provider>
  );
}
