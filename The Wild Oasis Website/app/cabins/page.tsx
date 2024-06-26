import type { Metadata } from 'next';
import { Suspense } from 'react';

import { H2 } from '../_components/H2';
import { Main } from '../_components/Main';
import { SpinnerWithMessage } from '../_components/SpinnerWithMessage';
import { CabinList } from './_components/CabinList';

export const metadata: Metadata = {
  title: 'Cabins',
};

export default function CabinsPage(): JSX.Element {
  return (
    <Main>
      <H2>Our Luxury Cabins</H2>
      <p className="mb-20">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense
        fallback={<SpinnerWithMessage message="loading cabins' data" />}
      >
        <CabinList />
      </Suspense>
    </Main>
  );
}
