'use client';

import { createContext } from 'react';
import { DateRange } from 'react-day-picker';

export const NewReservationContext = createContext<{
  dateRange?: DateRange;
  setDateRange: (range?: DateRange | undefined) => void;
  resetDateRange: () => void;
  nights: number;
}>({
  dateRange: undefined,
  setDateRange: () => null,
  resetDateRange: () => null,
  nights: 0,
});
