import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
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
        'w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200',
        className,
      )}
    />
  );
}
