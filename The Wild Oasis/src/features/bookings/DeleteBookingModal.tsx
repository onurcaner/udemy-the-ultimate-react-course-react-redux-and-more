import { ConfirmDelete } from '../../ui/ConfirmDelete';
import { Modal } from '../../ui/Modal';
import { useMutationDeleteBooking } from './useMutationDeleteBooking';

export function DeleteBookingModal({
  children,
  bookingId,
  onSuccess,
}: {
  children: JSX.Element;
  bookingId: number;
  onSuccess?: () => void;
}): JSX.Element {
  const { mutate, isPending } = useMutationDeleteBooking();

  const handleConfirm = () => {
    mutate(bookingId, { onSuccess });
  };

  return (
    <Modal.Provider>
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>

      <Modal.Window>
        <ConfirmDelete
          resourceName={`booking #${bookingId}`}
          disabled={isPending}
          onConfirm={handleConfirm}
        />
      </Modal.Window>
    </Modal.Provider>
  );
}
