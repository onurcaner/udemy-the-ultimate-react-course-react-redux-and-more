import { cache } from 'react';

import { appRevalidates } from '../_appRevalidates';
import { delayDebug } from './delayDebug';
import type { CountryAttributes } from './types';

export const revalidate = appRevalidates.countries;
export const getCountries = cache(async (): Promise<CountryAttributes[]> => {
  console.log('Inside: getCountries()');
  await delayDebug();

  const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
  if (!res.ok) throw new Error('Response is not ok');

  const countries = (await res.json()) as CountryAttributes[];
  if (countries.length === 0) throw new Error('countries.length is zero');

  return countries;
});
