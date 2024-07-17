'use client';

import { differenceInDays } from 'date-fns';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { NewReservationContext } from './NewReservationContext';

export function NewReservationContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <NewReservationContext.Provider
      value={{
        dateRange,
        setDateRange,
        resetDateRange: setDateRange.bind(null, undefined),
        nights:
          (dateRange?.from &&
            dateRange.to &&
            differenceInDays(dateRange.to, dateRange.from)) ??
          0,
      }}
    >
      {children}
    </NewReservationContext.Provider>
  );
}
