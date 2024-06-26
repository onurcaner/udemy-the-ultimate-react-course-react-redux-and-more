import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';
import Image from 'next/image';

import { H2 } from '@/app/_components/H2';
import { Main } from '@/app/_components/Main';
import { getCabin } from '@/app/_services/apiCabins';

interface CabinPageParams {
  params: { cabinId: number };
}

export async function generateMetadata({
  params,
}: CabinPageParams): Promise<Metadata> {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin: ${name}`,
  };
}

export default async function CabinPage({
  params,
}: CabinPageParams): Promise<JSX.Element> {
  const { description, imageUrl, maxCapacity, name } = await getCabin(
    params.cabinId,
  );

  return (
    <Main>
      <section className="mb-24 grid grid-cols-2 border border-primary-200 dark:border-primary-800">
        <div className="relative border-r border-primary-200 dark:border-primary-800">
          <Image
            src={imageUrl}
            alt={`Cabin ${name}`}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="px-8 py-10">
          <H2>Cabin {name}</H2>

          <p className="mb-10">{description}</p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <UsersIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <p>
                For up to <span className="font-bold">{maxCapacity}</span>{' '}
                guests
              </p>
            </li>
            <li className="flex items-center gap-4">
              <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <p>
                Located in the heart of the{' '}
                <span className="font-bold">Dolomites</span> (Italy)
              </p>
            </li>
            <li className="flex items-center gap-4">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <p>
                Privacy <span className="font-bold">100%</span> guaranteed
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <H2 className="text-center capitalize">
          Reserve today, Pay on arrival!
        </H2>
      </section>
    </Main>
  );
}
