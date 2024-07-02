import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export function Form({ className, children, ...rest }: FormProps): JSX.Element {
  return (
    <form
      {...rest}
      className={twMerge(
        'flex flex-col gap-y-6 bg-primary-100 px-12 py-8 dark:bg-primary-900',
        className,
      )}
    >
      {children}
    </form>
  );
}
