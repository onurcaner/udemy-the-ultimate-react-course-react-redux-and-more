import { ReactNode, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteCity } from '../data/deleteCity';
import { getCities } from '../data/getCities';
import { getCity } from '../data/getCity';
import { postCity } from '../data/postCity';
import { CityAttributes } from '../data/types';
import { useFetchBasic } from '../hooks/useFetchBasic';
import { useFetchWatch } from '../hooks/useFetchWatch';
import { APP } from '../routes';
import { CitiesContext } from './CitiesContext';
import {
  CityProviderAction,
  CityProviderState,
  initialCityProviderState,
  reduceCityProvider,
} from './reduceCityProvider';

export function CitiesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const navigate = useNavigate();

  const [{ selectedCityId, cityToPostCity, cityIdToDeleteCity }, dispatch] =
    useReducer<
      (
        state: CityProviderState,
        action: CityProviderAction,
      ) => CityProviderState
    >(reduceCityProvider, initialCityProviderState);

  const [cities, isLoadingCities, errorCities, setTriggerOfFetchCities] =
    useFetchBasic<CityAttributes[]>({
      customFetch: getCities,
      initialState: [],
    });

  const [selectedCity, isLoadingSelectedCity, errorSelectedCity] =
    useFetchWatch<CityAttributes | null, number | string>({
      customFetch: getCity,
      fetchParameter: selectedCityId,
      initialState: null,
    });

  const [postedCity, isLoadingPostCity, errorPostCity] = useFetchWatch<
    CityAttributes | null,
    Omit<CityAttributes, 'id'>
  >({
    customFetch: postCity,
    fetchParameter: cityToPostCity,
    initialState: null,
  });

  const [deletedCity, isLoadingDeleteCity, errorDeleteCity] = useFetchWatch<
    CityAttributes | null,
    number | string
  >({
    customFetch: deleteCity,
    fetchParameter: cityIdToDeleteCity,
    initialState: null,
  });

  useEffect(() => {
    if (!postedCity) return;

    navigate('/' + APP);
    dispatch({
      type: 'selectedCityId/will-be-fetched',
      payload: postedCity.id,
    });
    setTriggerOfFetchCities((n) => n + 1);
  }, [postedCity, navigate, setTriggerOfFetchCities]);

  useEffect(() => {
    if (!deletedCity) return;

    setTriggerOfFetchCities((n) => n + 1);
  }, [deletedCity, setTriggerOfFetchCities]);

  return (
    <CitiesContext.Provider
      value={{
        cities: {
          cities,
          isLoading: isLoadingCities,
          error: errorCities,
        },

        selectedCity: {
          selectedCity,
          isLoading: isLoadingSelectedCity,
          error: errorSelectedCity,
        },

        postCity: {
          isLoading: isLoadingPostCity,
          error: errorPostCity,
        },

        deleteCity: {
          isLoading: isLoadingDeleteCity,
          error: errorDeleteCity,
        },

        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
