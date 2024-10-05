import type { Metadata } from 'next';
import type { JSX } from 'react';

import { appRevalidates } from '@/app/_appRevalidates';
import { Params, appRoutes } from '@/app/_appRoutes';
import { H2 } from '@/app/_components/H2';
import { LoginMessage } from '@/app/_components/LoginMessage';
import { Main } from '@/app/_components/Main';
import { auth } from '@/app/_features/auth/auth';
import { CabinDetails } from '@/app/_features/cabins/CabinDetails';
import { NewReservationDateSelector } from '@/app/_features/reservations/NewReservationDateSelector';
import { NewReservationForm } from '@/app/_features/reservations/NewReservationForm';
import { getBookedDatesByCabinId } from '@/app/_services/apiBookings';
import { getCabin, getCabins } from '@/app/_services/apiCabins';
import { getSettings } from '@/app/_services/apiSettings';
import { LoginSearchFields } from '@/app/login/_query';

interface CabinPageParams {
  params: { [Params.CabinId]: string };
}

export const revalidate = Math.min(
  appRevalidates.cabin,
  appRevalidates.settings,
  appRevalidates.booking,
);

export async function generateStaticParams(): Promise<
  CabinPageParams['params'][]
> {
  const cabins = await getCabins();
  const cabinIds = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return cabinIds;
}

export async function generateMetadata({
  params,
}: CabinPageParams): Promise<Metadata> {
  const { name } = await getCabin(+params.cabinId);

  return {
    title: `Cabin: ${name}`,
  };
}

export default async function CabinPage({
  params,
}: CabinPageParams): Promise<JSX.Element> {
  const [cabin, settings, bookedDates, session] = await Promise.all([
    getCabin(+params.cabinId),
    getSettings(),
    getBookedDatesByCabinId(+params.cabinId),
    auth(),
  ]);

  return (
    <Main>
      <section>
        <CabinDetails cabin={cabin} />
      </section>

      <section>
        <H2 className="text-center capitalize">
          Reserve {cabin.name} today, Pay on arrival!
        </H2>

        <div className="grid grid-cols-2 border border-primary-200 dark:border-primary-800">
          <NewReservationDateSelector
            cabin={cabin}
            settings={settings}
            bookedDates={bookedDates}
          />
          {!session?.user && (
            <LoginMessage
              searchParams={{
                [LoginSearchFields.RedirectTo]: appRoutes.cabin(params.cabinId),
              }}
            />
          )}
          {session?.user && (
            <NewReservationForm
              cabin={cabin}
              user={{
                name: session.user.name ?? 'NO NAME',
                image: session.user.image ?? '',
              }}
            />
          )}
        </div>
      </section>
    </Main>
  );
}
