import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export function Textarea({ className, ...rest }: TextareaProps): JSX.Element {
  return (
    <textarea
      {...rest}
      className={twMerge(
        'w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200',
        className,
      )}
    />
  );
}
