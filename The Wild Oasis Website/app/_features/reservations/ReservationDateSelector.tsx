'use client';

import { isWithinInterval } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { CabinAttributes, SettingsAttributes } from '@/app/_services/types';

export function DateSelector({
  cabin,
  settings,
  bookedDates,
}: {
  cabin: CabinAttributes;
  settings: SettingsAttributes;
  bookedDates: Date[];
}): JSX.Element {
  const numNights = 23;
  const range = { from: null, to: null };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        min={settings.minimumBookingLength + 1}
        max={settings.maximumBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between bg-accent-500 px-8 py-4 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {cabin.discount > 0 && (
              <>
                <span className="text-2xl">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${cabin.regularPrice}
                </span>
              </>
            )}
            {cabin.discount <= 0 && (
              <span className="text-2xl">${cabin.regularPrice}</span>
            )}
            <span className="">/ night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">
                  ${numNights * (cabin.regularPrice - cabin.discount)}
                </span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}
