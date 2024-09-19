'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import type { JSX } from 'react';

import { useNewReservationContext } from './useNewReservationContext';
import { Button } from '@/app/_components/Button';

export function NewReservationReminder(): JSX.Element {
  const { dateRange, resetDateRange } = useNewReservationContext();

  if (!dateRange?.from || !dateRange.to) return <></>;

  return (
    <div className="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full bg-primary-200 px-10 py-5 font-semibold shadow-lg dark:bg-primary-800">
      <p>
        Don&apos;f forget to reserve your dates
        <br /> from {format(new Date(dateRange.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(dateRange.to), 'MMM dd yyyy')}
      </p>
      <Button
        $variant="secondary"
        onClick={resetDateRange}
        className="rounded-full bg-transparent p-1 dark:bg-transparent"
      >
        <XMarkIcon className="icon" />
      </Button>
    </div>
  );
}
