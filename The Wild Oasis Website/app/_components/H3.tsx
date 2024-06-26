import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type H2Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function H3({ children, className, ...rest }: H2Props): JSX.Element {
  return (
    <h2
      {...rest}
      className={twMerge(
        'mb-5 text-2xl font-medium text-accent-700 dark:text-accent-400',
        className,
      )}
    >
      {children}
    </h2>
  );
}
