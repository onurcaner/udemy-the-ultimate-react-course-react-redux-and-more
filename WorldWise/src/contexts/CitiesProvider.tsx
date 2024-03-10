import { ReactNode, useState } from 'react';

import { CitiesContext } from './CitiesContext';

import { CityAttributes } from '../data/types';
import { getCities } from '../data/getCities';

import { useGetBasic } from '../hooks/useGetBasic';
import { useGetWatch } from '../hooks/useGetWatch';
import { getCity } from '../data/getCity';

export function CitiesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [currentCityId, setCurrentCityId] = useState<number | string>('');

  const [cities, isLoadingCities, errorCities] = useGetBasic<CityAttributes[]>({
    customGet: getCities,
    initialState: [],
  });

  const [currentCity, isLoadingCurrentCity, errorCurrentCity] = useGetWatch<
    CityAttributes | null,
    string | number
  >({ customGet: getCity, getParameter: currentCityId, initialState: null });

  return (
    <CitiesContext.Provider
      value={{
        cities: {
          cities,
          isLoading: isLoadingCities,
          error: errorCities,
        },
        currentCity: {
          currentCity,
          isLoading: isLoadingCurrentCity,
          error: errorCurrentCity,
          setCurrentCityId,
        },
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
