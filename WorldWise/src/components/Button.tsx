import { MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Button.module.css';

export interface ButtonProps {
  children: ReactNode;
  functionType: 'primary' | 'back' | 'position';
  type?: 'submit' | 'reset' | 'button';
  ariaLabel?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  functionType,
  type,
  ariaLabel,
  isDisabled = false,
  onClick,
}: ButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (functionType === 'back') {
      e.preventDefault();
      navigate(-1);
      return;
    }

    onClick?.();
  };

  return (
    <button
      className={`${styles.btn} ${styles[functionType]}`}
      onClick={handleClick}
      type={type}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
