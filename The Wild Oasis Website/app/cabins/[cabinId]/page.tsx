import type { Metadata } from 'next';

import { appRevalidates } from '@/app/_appRevalidates';
import { H2 } from '@/app/_components/H2';
import { Main } from '@/app/_components/Main';
import { CabinDetails } from '@/app/_features/cabins/CabinDetails';
import { DateSelector } from '@/app/_features/reservations/ReservationDateSelector';
import { ReservationForm } from '@/app/_features/reservations/ReservationForm';
import { getBookedDatesByCabinId } from '@/app/_services/apiBookings';
import { getCabin, getCabins } from '@/app/_services/apiCabins';
import { getSettings } from '@/app/_services/apiSettings';

interface CabinPageParams {
  params: { cabinId: string };
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
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
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
  const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(+params.cabinId),
    getSettings(),
    getBookedDatesByCabinId(+params.cabinId),
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
          <DateSelector
            cabin={cabin}
            settings={settings}
            bookedDates={bookedDates}
          />
          <ReservationForm cabin={cabin} />
        </div>
      </section>
    </Main>
  );
}
