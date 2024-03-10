import { useContext } from 'react';

import { CitiesContext, CitiesContextValue } from './CitiesContext';

export function useCitiesContext(): CitiesContextValue {
  const citiesContext = useContext(CitiesContext) as
    | CitiesContextValue
    | undefined;
  if (citiesContext === undefined)
    throw new Error('Can not consume CitiesContext outside of CitiesProvider');
  return citiesContext;
}
