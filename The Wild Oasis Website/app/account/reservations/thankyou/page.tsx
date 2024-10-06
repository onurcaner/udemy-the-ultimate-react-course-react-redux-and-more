import type { Metadata } from 'next';
import type { JSX } from 'react';

import { appRoutes } from '@/app/_appRoutes';
import { CustomLink } from '@/app/_components/CustomLink';
import { H2 } from '@/app/_components/H2';
import { Main } from '@/app/_components/Main';

export const metadata: Metadata = {
  title: 'Thank You',
};

export default function ThankYouPage(): JSX.Element {
  return (
    <Main>
      <H2 className="text-3xl font-semibold">
        Thank you for your reservation!
      </H2>
      <CustomLink href={appRoutes.reservations}>
        Manage your reservations &rarr;
      </CustomLink>
    </Main>
  );
}
