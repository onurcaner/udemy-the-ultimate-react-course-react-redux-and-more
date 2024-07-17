import { ArrowRightIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { appRoutes } from '@/app/_appRoutes';
import { Card } from '@/app/_components/Card';
import { CustomLink } from '@/app/_components/CustomLink';
import { H3 } from '@/app/_components/H3';
import { CabinAttributes } from '@/app/_services/types';

export function CabinCard({ cabin }: { cabin: CabinAttributes }) {
  const { id, name, maxCapacity, regularPrice, discount, imageUrl } = cabin;

  return (
    <Card className="grid grid-cols-5">
      <div className="relative col-span-2 border-r border-primary-200 bg-primary-800 dark:border-primary-800 dark:bg-primary-200">
        <Image
          src={imageUrl}
          alt={`Cabin ${name}`}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="col-span-3">
        <div className="px-8 py-5">
          <H3>Cabin {name}</H3>

          <div className="mb-10 flex items-center gap-2">
            <UsersIcon className="icon" />
            <p>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            <span className="text-3xl">${regularPrice - discount}</span>
            {discount > 0 && (
              <span className="text-xl font-semibold text-primary-400 line-through dark:text-primary-600">
                ${regularPrice}
              </span>
            )}
            <span>/ night</span>
          </p>
        </div>

        <div className="flex justify-end border-t border-primary-200 dark:border-t-primary-800">
          <CustomLink
            href={appRoutes.cabin(String(id))}
            $variant="primary"
            className="flex items-center gap-x-4 text-base"
          >
            <span>Details & reservation</span>
            <span>
              <ArrowRightIcon className="h-5 w-5" />
            </span>
          </CustomLink>
        </div>
      </div>
    </Card>
  );
}
