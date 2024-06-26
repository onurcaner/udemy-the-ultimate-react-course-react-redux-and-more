import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type UlProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export function Ul({ children, className, ...rest }: UlProps): JSX.Element {
  return (
    <ul
      {...rest}
      className={twMerge('grid grid-cols-2 gap-x-16 gap-y-24', className)}
    >
      {children}
    </ul>
  );
}
