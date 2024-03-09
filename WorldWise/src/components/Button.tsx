import { ReactNode } from 'react';

import styles from './Button.module.css';

export interface ButtonProps {
  children: ReactNode;
  functionType: 'primary' | 'back' | 'position';
  type?: 'submit' | 'reset' | 'button';
  ariaLabel?: string;
  onClick?: () => void;
}

export function Button({
  children,
  functionType,
  type,
  ariaLabel,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.btn} ${styles[functionType]}`}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
