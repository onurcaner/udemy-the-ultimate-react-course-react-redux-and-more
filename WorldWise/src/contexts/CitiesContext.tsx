import { createContext } from 'react';

import { CityAttributes } from '../data/types';

export const CitiesContext = createContext<CitiesContextValue | null>(null);

export interface CitiesContextValue {
  cities: {
    cities: CityAttributes[];
    isLoading: boolean;
    error: Error | null;
  };
  currentCity: {
    currentCity: CityAttributes | null;
    isLoading: boolean;
    error: Error | null;
    setCurrentCityId: (id: string | number) => void;
  };
}
