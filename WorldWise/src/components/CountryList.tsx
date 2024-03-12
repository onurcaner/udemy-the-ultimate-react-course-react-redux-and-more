import { useCitiesContext } from '../contexts/useCitiesContext';
import { CountryAttributes } from '../data/types';
import { CountryItem } from './CountryItem';
import styles from './CountryList.module.css';
import { Message } from './Message';
import { Spinner } from './Spinner';

export function CountryList(): JSX.Element {
  const {
    cities: { cities, isLoading },
  } = useCitiesContext();

  if (isLoading) return <Spinner />;

  const countries: CountryAttributes[] = cities
    .map<CountryAttributes>((city) => ({
      country: city.country,
      emoji: city.emoji,
    }))
    .reduce<CountryAttributes[]>((reduced, country) => {
      const hasCountry = reduced.some(
        ({ country: countryName }) => countryName === country.country,
      );
      if (!hasCountry) reduced.push(country);
      return reduced;
    }, []);

  if (!countries.length)
    return <Message message="Add your first country by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map<JSX.Element>((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
