import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type SignOutButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignOutButton({ ...rest }: SignOutButtonProps) {
  return (
    <button {...rest}>
      <ArrowRightStartOnRectangleIcon className="icon" />
      <span>Sign out</span>
    </button>
  );
}
