import { MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleClick: MouseEventHandler = () => {
    if (functionType === 'back') {
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
    >
      {children}
    </button>
  );
}
