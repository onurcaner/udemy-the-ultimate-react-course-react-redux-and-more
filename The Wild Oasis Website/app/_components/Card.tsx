import type { DetailedHTMLProps, HTMLAttributes, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Card({ children, className, ...rest }: CardProps): JSX.Element {
  return (
    <div
      {...rest}
      className={twMerge(
        'border border-primary-200 dark:border-primary-800',
        className,
      )}
    >
      {children}
    </div>
  );
}
