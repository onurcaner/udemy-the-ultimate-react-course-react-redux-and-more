import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type NavLinkProps = HTMLAttributes<HTMLAnchorElement> & LinkProps;

export function NavLink({
  children,
  className,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <Link
      {...rest}
      className={twMerge('transition-colors hover:text-accent-400', className)}
    >
      {children}
    </Link>
  );
}
