import type { DetailedHTMLProps, HTMLAttributes, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

type MainProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Main({ children, className, ...rest }: MainProps): JSX.Element {
  return (
    <main
      {...rest}
      className={twMerge('mx-auto max-w-7xl px-8 py-16 text-lg', className)}
    >
      {children}
    </main>
  );
}
