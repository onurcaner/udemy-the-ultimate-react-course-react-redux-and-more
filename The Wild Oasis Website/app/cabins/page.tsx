import type { Metadata } from 'next';
import { Suspense } from 'react';

import { NewReservationReminder } from '../_features/reservations/NewReservationReminder';
import { CabinsSearchCapacityValues, CabinsSearchFields } from './_query';
import { H2 } from '@/app/_components/H2';
import { Main } from '@/app/_components/Main';
import { SpinnerWithMessage } from '@/app/_components/SpinnerWithMessage';
import { CabinList } from '@/app/_features/cabins/CabinList';
import { CabinsFilter } from '@/app/_features/cabins/CabinsFilter';

interface CabinsPageQuery {
  searchParams: { [CabinsSearchFields.Capacity]?: CabinsSearchCapacityValues };
}

export const metadata: Metadata = {
  title: 'Cabins',
};

export default function CabinsPage({
  searchParams,
}: CabinsPageQuery): JSX.Element {
  const capacityFilterValue =
    searchParams[CabinsSearchFields.Capacity] ?? CabinsSearchCapacityValues.All;

  return (
    <Main>
      <NewReservationReminder />
      <H2>Our Luxury Cabins</H2>

      <p className="mb-20">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-10 flex justify-end">
        <CabinsFilter />
      </div>

      <Suspense
        fallback={<SpinnerWithMessage message="Loading cabins' data" />}
        key={capacityFilterValue}
      >
        <CabinList capacityFilterValue={capacityFilterValue} />
      </Suspense>
    </Main>
  );
}
