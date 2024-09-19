import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

import { appRoutes } from '@/app/_appRoutes';
import logoSrc from '@/app/_assets/logo.png';

export function Logo(): JSX.Element {
  return (
    <Link href={appRoutes.root} className="flex items-center gap-4">
      <Image
        className="h-16 w-16 rounded-full object-cover object-center"
        src={logoSrc}
        placeholder="blur"
        alt="The Wild Oasis logo"
      />
      <h1 className="text-xl font-bold capitalize leading-none text-primary-800 dark:text-primary-200">
        The Wild Oasis
      </h1>
    </Link>
  );
}
