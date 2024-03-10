import styles from './CountryList.module.css';

import { CountryAttributes } from '../data/types';

import { Message } from './Message';
import { CountryItem } from './CountryItem';
import { Spinner } from './Spinner';

import { useCitiesContext } from '../contexts/useCitiesContext';

export function CountryList(): JSX.Element {
  const {
    cities: { cities, isLoading },
  } = useCitiesContext();

  if (isLoading) return <Spinner />;

  const _countries: CountryAttributes[] = cities.map(
    (city): CountryAttributes => ({
      country: city.country,
      emoji: city.emoji,
    })
  );

  const countries = [...new Set(_countries)];

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
