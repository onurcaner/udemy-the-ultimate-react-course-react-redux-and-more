import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  LinkProps;

export function ButtonLink({
  children,
  className,
  ...rest
}: ButtonLinkProps): JSX.Element {
  return (
    <Link
      {...rest}
      className={twMerge(
        'inline-block bg-accent-500 px-[2em] py-[1em] font-bold text-primary-900 transition-colors hover:bg-accent-600',
        className,
      )}
    >
      {children}
    </Link>
  );
}
