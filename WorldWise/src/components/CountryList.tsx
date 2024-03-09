import styles from './CountryList.module.css';

import { CountryAttributes } from '../data/types';

import { Message } from './Message';
import { CountryItem } from './CountryItem';

export interface CountryListProps {
  countries: CountryAttributes[];
}

export function CountryList({ countries }: CountryListProps): JSX.Element {
  if (!countries.length)
    return <Message message="Add your first country by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
