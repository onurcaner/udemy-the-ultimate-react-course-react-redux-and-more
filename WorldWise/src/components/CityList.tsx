import styles from './CityList.module.css';

import { CityAttributes } from '../data/types';

import { CityItem } from './CityItem';
import { Message } from './Message';

export interface CityListProps {
  cities: CityAttributes[];
}

export function CityList({ cities }: CityListProps): JSX.Element {
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
