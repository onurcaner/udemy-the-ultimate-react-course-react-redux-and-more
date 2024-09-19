import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  $variant?: 'primary' | 'secondary' | 'underline';
}

export function Button({
  children,
  className,
  $variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  const isButton = $variant === 'primary' || $variant === 'secondary';
  const isText = $variant === 'underline';

  return (
    <button
      {...rest}
      className={twMerge(
        twJoin(
          'inline-block !leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-80',
          isButton && 'px-[2em] py-[1em] font-bold',
          isText && 'underline underline-offset-2',
          $variant === 'primary' &&
            'bg-accent-500 text-primary-900 hover:bg-accent-600',
          $variant == 'secondary' &&
            'bg-primary-800 text-primary-200 hover:bg-primary-700 dark:bg-primary-200 dark:text-primary-800 dark:hover:bg-primary-100',
          $variant === 'underline' &&
            'text-accent-800 hover:text-accent-700 dark:text-accent-200 dark:hover:text-accent-300',
        ),
        className,
      )}
    >
      {children}
    </button>
  );
}
