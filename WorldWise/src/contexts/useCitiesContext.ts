import { useContext } from 'react';

import { CitiesContext, CitiesContextValue } from './CitiesContext';

export function useCitiesContext(): CitiesContextValue {
  const citiesContext = useContext(CitiesContext);
  if (!citiesContext)
    throw new Error('Can not consume CitiesContext outside of CitiesProvider');
  return citiesContext;
}
