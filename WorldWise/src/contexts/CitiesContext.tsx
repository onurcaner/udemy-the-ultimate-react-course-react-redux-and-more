import { Dispatch, createContext } from 'react';

import { CityAttributes } from '../data/types';
import { CityProviderAction } from './reduceCityProvider';

export const CitiesContext = createContext<
  CitiesContextValue | null | undefined
>(null);

export interface CitiesContextValue {
  cities: {
    cities: CityAttributes[];
    isLoading: boolean;
    error: Error | null;
  };
  selectedCity: {
    selectedCity: CityAttributes | null;
    isLoading: boolean;
    error: Error | null;
  };
  postCity: {
    isLoading: boolean;
    error: Error | null;
  };
  deleteCity: {
    isLoading: boolean;
    error: Error | null;
  };
  dispatch: Dispatch<CityProviderAction>;
}
