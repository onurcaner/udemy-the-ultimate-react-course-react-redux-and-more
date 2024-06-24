import Image from 'next/image';
import Link from 'next/link';

import logoSrc from '../_assets/logo.png';

export function Logo(): JSX.Element {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src={logoSrc} alt="The Wild Oasis logo" />
      <h1 className="text-xl font-semibold uppercase text-primary-100">
        The Wild Oasis
      </h1>
    </Link>
  );
}
