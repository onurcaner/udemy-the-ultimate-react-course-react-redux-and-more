import { MouseEventHandler } from 'react';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

import { ButtonIcon } from '../../ui/ButtonIcon';
import { SpinnerMini } from '../../ui/SpinnerMini';
import { useMutationLogout } from './useMutationLogout';

export function LogoutButton(): JSX.Element {
  const { mutate, isPending } = useMutationLogout();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    mutate();
  };

  return (
    <ButtonIcon onClick={handleClick} type="button" aria-label="Log out">
      {isPending && (
        <span>
          <SpinnerMini />
        </span>
      )}
      {!isPending && (
        <span>
          <HiOutlineArrowRightOnRectangle />
        </span>
      )}
    </ButtonIcon>
  );
}
