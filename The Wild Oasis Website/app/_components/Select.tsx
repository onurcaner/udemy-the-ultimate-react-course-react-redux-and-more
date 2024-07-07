import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export function Select({
  className,
  children,
  ...rest
}: SelectProps): JSX.Element {
  return (
    <select
      {...rest}
      className={twMerge(
        'w-full cursor-pointer rounded-sm bg-primary-200 px-5 py-3 text-primary-800 dark:bg-primary-800 dark:text-primary-200',
        className,
      )}
    >
      {children}
    </select>
  );
}
