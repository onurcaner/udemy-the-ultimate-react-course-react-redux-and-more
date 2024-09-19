import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { signOutAction } from './signOutActions';

type SignOutButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignOutButton({ ...rest }: SignOutButtonProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signOutAction}>
      <button {...rest}>
        <ArrowRightStartOnRectangleIcon className="icon" />
        <span>Sign out</span>
      </button>
    </form>
  );
}
