import { Link } from 'react-router-dom';

import { useCitiesContext } from '../contexts/useCitiesContext';
import { CityAttributes } from '../data/types';
import styles from './CityItem.module.css';

export interface CityItemProps {
  city: CityAttributes;
}

export function CityItem({ city }: CityItemProps): JSX.Element {
  const {
    currentCity: { currentCity },
  } = useCitiesContext();

  const {
    cityName,
    date,
    emoji,
    id,
    position: { lat, lng },
  } = city;

  const linkTo = `${id}?lat=${lat}&lng=${lng}`;
  const linkClassList = [styles.cityItem];
  if (currentCity?.id === id) linkClassList.push(styles['cityItem--active']);

  return (
    <li>
      <Link className={linkClassList.join(' ')} to={linkTo}>
        <span className={styles.emoji} aria-label="Country emoji">
          {emoji}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date} dateTime={date}>
          ({formatDate(date)})
        </time>
        <button className={styles.deleteBtn} type="button" aria-label="Delete">
          X
        </button>
      </Link>
    </li>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
