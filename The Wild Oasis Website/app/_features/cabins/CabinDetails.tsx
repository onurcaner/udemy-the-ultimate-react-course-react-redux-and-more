import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import type { JSX } from 'react';

import { H2 } from '@/app/_components/H2';
import { PWithShowButton } from '@/app/_components/PWithShowButton';
import { CabinAttributes } from '@/app/_services/types';

export function CabinDetails({
  cabin,
}: {
  cabin: CabinAttributes;
}): JSX.Element {
  const { description, imageUrl, maxCapacity, name } = cabin;

  return (
    <div className="mb-24 grid grid-cols-2 border border-primary-200 dark:border-primary-800">
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

        <PWithShowButton className="mb-10">{description}</PWithShowButton>

        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <UsersIcon className="icon" />
            <p>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </li>
          <li className="flex items-center gap-4">
            <MapPinIcon className="icon" />
            <p>
              Located in the heart of the{' '}
              <span className="font-bold">Dolomites</span> (Italy)
            </p>
          </li>
          <li className="flex items-center gap-4">
            <EyeSlashIcon className="icon" />
            <p>
              Privacy <span className="font-bold">100%</span> guaranteed
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
