import type { DetailedHTMLProps, JSX, SelectHTMLAttributes } from 'react';

import { appRevalidates } from '@/app/_appRevalidates';
import { Select } from '@/app/_components/Select';
import { getCountries } from '@/app/_services/apiCountries';

export const revalidate = appRevalidates.countries;

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
