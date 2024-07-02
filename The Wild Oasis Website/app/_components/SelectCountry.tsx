// Let's imagine your colleague already built this component 😃
import type { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import { revalidates } from '../_revalidates';
import { getCountries } from '../_services/apiCountries';

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
  name,
  id,
  className,
}: SelectCountryProps): Promise<JSX.Element> {
  const countries = await getCountries();
  const defaultFlag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${defaultFlag}`}
      name={name}
      id={id}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
