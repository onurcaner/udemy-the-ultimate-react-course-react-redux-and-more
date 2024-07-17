'use client';

import { useContext } from 'react';

import { NewReservationContext } from './NewReservationContext';

export function useNewReservationContext() {
  return useContext(NewReservationContext);
}
