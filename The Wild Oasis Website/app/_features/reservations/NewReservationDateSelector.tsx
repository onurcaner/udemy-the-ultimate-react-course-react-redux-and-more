'use client';

import { isPast, isSameDay, isWithinInterval } from 'date-fns';
import { type JSX, useEffect } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useNewReservationContext } from './useNewReservationContext';
import { Button } from '@/app/_components/Button';
import { CabinAttributes, SettingsAttributes } from '@/app/_services/types';

export function NewReservationDateSelector({
  cabin,
  settings,
  bookedDates,
}: {
  cabin: CabinAttributes;
  settings: SettingsAttributes;
  bookedDates: Date[];
}): JSX.Element {
  const { dateRange, setDateRange, resetDateRange, nights } =
    useNewReservationContext();

  useEffect(() => {
    if (isRangeAlreadyBooked(bookedDates, dateRange)) resetDateRange();
  }, [bookedDates, dateRange, resetDateRange]);

  return (
    <div className="flex flex-col justify-between gap-y-4">
      <DayPicker
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        min={settings.minimumBookingLength + 1}
        max={settings.maximumBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        numberOfMonths={2}
        disabled={(testDate) =>
          isPast(testDate) ||
          bookedDates.some((bookedDate) => isSameDay(bookedDate, testDate))
        }
        captionLayout="dropdown"
        className="place-self-center pt-12"
      />

      {(dateRange?.from ?? dateRange?.to) ? (
        <Button
          $variant="outline"
          className="self-center py-3 text-base"
          onClick={resetDateRange}
        >
          Clear
        </Button>
      ) : (
        <div className="h-10"></div>
      )}

      <div className="flex items-center justify-between bg-accent-500 px-8 py-4 text-primary-800">
        <div className="flex w-full items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            <span className="text-3xl">
              ${cabin.regularPrice - cabin.discount}
            </span>
            {cabin.discount > 0 && (
              <span className="text-xl font-semibold line-through opacity-80">
                ${cabin.regularPrice}
              </span>
            )}
            <span>/ night</span>
          </p>
          {nights > 0 && (
            <>
              <p className="text-2xl" aria-label="Nights">
                <span>&times;</span> <span>{nights}</span>
              </p>
              <p className="ml-auto text-3xl font-semibold">
                ${nights * (cabin.regularPrice - cabin.discount)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function isRangeAlreadyBooked(bookedDates: Date[], range?: DateRange): boolean {
  if (!range) return false;

  const { from, to } = range;
  if (!from || !to) return false;

  return bookedDates.some((date) =>
    isWithinInterval(date, { start: from, end: to }),
  );
}
