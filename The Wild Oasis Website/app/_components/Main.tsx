import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type MainProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Main({ children, className, ...rest }: MainProps): JSX.Element {
  return (
    <main
      {...rest}
      className={twMerge('mx-auto my-16 max-w-7xl px-8 text-lg', className)}
    >
      {children}
    </main>
  );
}
