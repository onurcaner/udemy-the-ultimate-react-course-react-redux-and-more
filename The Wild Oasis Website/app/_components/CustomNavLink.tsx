'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

type CustomNavLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  LinkProps;

export function CustomNavLink({
  children,
  href,
  className,
  ...rest
}: CustomNavLinkProps): JSX.Element {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      {...rest}
      href={href}
      aria-current={isActive ? 'page' : 'false'}
      className={twMerge(
        'text-lg font-medium transition-colors hover:text-accent-800 aria-[current=page]:text-accent-800 dark:hover:text-accent-200 dark:aria-[current=page]:text-accent-200',
        className,
      )}
    >
      {children}
    </Link>
  );
}
