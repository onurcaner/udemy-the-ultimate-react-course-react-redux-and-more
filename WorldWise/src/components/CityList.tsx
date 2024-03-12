import { useCitiesContext } from '../contexts/useCitiesContext';
import { CityItem } from './CityItem';
import styles from './CityList.module.css';
import { Message } from './Message';
import { Spinner } from './Spinner';

export function CityList(): JSX.Element {
  const {
    cities: { cities, isLoading },
  } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map<JSX.Element>((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
