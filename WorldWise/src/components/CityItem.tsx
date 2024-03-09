import { Link } from 'react-router-dom';

import { CityAttributes } from '../data/types';

import styles from './CityItem.module.css';

export interface CityItemProps {
  city: CityAttributes;
}

export function CityItem({ city }: CityItemProps): JSX.Element {
  const {
    cityName,
    date,
    emoji,
    id,
    position: { lat, lng },
  } = city;

  const toLink = `${id}?lat=${lat}&lng=${lng}`;

  return (
    <li>
      <Link className={styles.cityItem} to={toLink}>
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
