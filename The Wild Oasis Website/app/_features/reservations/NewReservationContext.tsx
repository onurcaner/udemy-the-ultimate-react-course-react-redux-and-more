'use client';

import { createContext } from 'react';
import type { DateRange } from 'react-day-picker';

export const NewReservationContext = createContext<{
  dateRange?: DateRange;
  setDateRange: (range?: DateRange) => void;
  resetDateRange: () => void;
  nights: number;
}>({
  dateRange: undefined,
  setDateRange: () => null,
  resetDateRange: () => null,
  nights: 0,
});
