import { cache } from 'react';

export interface CountryAttributes {
  name: string;
  flag: string;
  independent: boolean;
}

export const getCountries = cache(async (): Promise<CountryAttributes[]> => {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    const countries = (await res.json()) as CountryAttributes[];
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
});
