import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, isFuture, isPast, isToday } from 'date-fns';
import Image from 'next/image';
import type { JSX } from 'react';

import { DeleteReservationButton } from './DeleteReservationButton';
import { Button } from '@/app/_components/Button';
import { Card } from '@/app/_components/Card';
import { CustomLink } from '@/app/_components/CustomLink';
import { H3 } from '@/app/_components/H3';
import { BookingAttributesExtended } from '@/app/_services/types';
import { formatDate } from '@/app/_utils/formatDate';
import { formatDistanceFromNow } from '@/app/_utils/formatDistanceFromNow';

interface ReservationCardProps {
  booking: BookingAttributesExtended;
}

export function ReservationCard({
  booking,
}: ReservationCardProps): JSX.Element {
  const {
    cabins: { imageUrl, name },
    createdAt,
    endDate,
    id,
    nights,
    numberOfGuests,
    startDate,
    totalPrice,
  } = booking;

  return (
    <Card className="flex">
      <div className="relative h-36 w-36">
        <Image
          src={imageUrl}
          alt={`Cabin ${name}`}
          className="absolute border-r border-primary-200 object-cover object-center dark:border-primary-800"
          fill
        />
      </div>

      <div className="flex flex-grow flex-col px-6 py-3">
        <div className="flex items-center justify-between">
          <H3 className="mb-2 text-primary-700 dark:text-primary-300">
            {nights} nights in Cabin {name}
          </H3>
          {isPast(new Date(startDate)) ? (
            <p className="flex items-center rounded-sm bg-orange-200 px-3 py-2 text-xs font-bold uppercase leading-none text-orange-800 dark:bg-orange-800 dark:text-orange-200">
              past
            </p>
          ) : (
            <p className="flex items-center rounded-sm bg-green-200 px-3 py-2 text-xs font-bold uppercase leading-none text-green-800 dark:bg-green-800 dark:text-green-200">
              upcoming
            </p>
          )}
        </div>

        <p>
          {formatDate(startDate)} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {formatDate(endDate)}
        </p>

        <div className="mt-auto flex items-baseline gap-5">
          <p className="text-xl font-semibold text-accent-700 dark:text-accent-300">
            ${totalPrice}
          </p>
          <p>&bull;</p>
          <p>
            {numberOfGuests} guest{numberOfGuests > 1 && 's'}
          </p>
          <p className="ml-auto text-sm font-semibold text-primary-700 dark:text-primary-300">
            Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className="grid grid-rows-2 border-l border-primary-200 dark:border-primary-800">
        {isFuture(startDate) && (
          <CustomLink
            $variant="outline"
            href={`/account/reservations/edit/${String(id)}`}
            className="flex items-center gap-2 border-0 border-primary-200 text-xs font-bold uppercase dark:border-primary-800"
          >
            <span>
              <PencilSquareIcon className="icon" />
            </span>
            <span>Edit</span>
          </CustomLink>
        )}
        {isPast(startDate) && (
          <Button
            $variant="outline"
            className="flex items-center gap-2 border-0 border-primary-200 text-xs font-bold uppercase dark:border-primary-800"
            disabled
          >
            <span>
              <PencilSquareIcon className="icon" />
            </span>
            <span>Edit</span>
          </Button>
        )}

        <DeleteReservationButton
          bookingId={id}
          className="flex items-center gap-2 border-0 border-t border-primary-200 text-xs font-bold uppercase dark:border-primary-800"
          disabled={isPast(startDate)}
        />
      </div>
    </Card>
  );
}
