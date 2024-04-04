import { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Select } from './Select';

export function SortBy({
  searchParamName,
  selectOptions,
}: {
  searchParamName: string;
  selectOptions: { label: string; value: string }[];
}): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValue =
    searchParams.get(searchParamName) ?? selectOptions.at(0)?.value ?? '';

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    searchParams.set(searchParamName, value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      onChange={handleChange}
      $variant="light"
      defaultValue={defaultValue}
    >
      {selectOptions.map(({ label, value }) => (
        <option key={label + value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
