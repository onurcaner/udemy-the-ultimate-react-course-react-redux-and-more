import type { DetailedHTMLProps, InputHTMLAttributes, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ className, ...rest }: InputProps): JSX.Element {
  return (
    <input
      {...rest}
      className={twMerge(
        'w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 placeholder:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200 dark:placeholder:text-primary-400',
        className,
      )}
    />
  );
}
