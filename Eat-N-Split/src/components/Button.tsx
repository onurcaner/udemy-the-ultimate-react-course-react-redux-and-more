import { ReactNode, MouseEventHandler } from 'react';

export interface ButtonProps {
  children: ReactNode;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  onClick,
  ariaLabel,
}: ButtonProps): JSX.Element {
  return (
    <button className="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
