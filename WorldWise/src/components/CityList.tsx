import styles from './CityList.module.css';

import { CityItem } from './CityItem';
import { Message } from './Message';
import { Spinner } from './Spinner';

import { useCitiesContext } from '../contexts/useCitiesContext';

export function CityList(): JSX.Element {
  const {
    cities: { cities, isLoading },
  } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
