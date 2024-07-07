// Let's imagine your colleague already built this component 😃
import type { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import { revalidates } from '../_revalidates';
import { getCountries } from '../_services/apiCountries';
import { Select } from './Select';

export const revalidate = revalidates.countries;

interface SelectCountryProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  defaultCountry: string;
}

export async function SelectCountry({
  defaultCountry,
  ...rest
}: SelectCountryProps): Promise<JSX.Element> {
  const countries = await getCountries();
  const defaultFlag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <Select {...rest} defaultValue={`${defaultCountry}%${defaultFlag}`}>
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}
