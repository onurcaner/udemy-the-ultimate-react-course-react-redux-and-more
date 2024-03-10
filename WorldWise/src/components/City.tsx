import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './City.module.css';

import { Button } from './Button';
import { Spinner } from './Spinner';
import { Message } from './Message';
import { useCitiesContext } from '../contexts/useCitiesContext';

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date ?? ''));

export function City(): JSX.Element {
  const {
    currentCity: { currentCity, isLoading, setCurrentCityId },
  } = useCitiesContext();
  const { id } = useParams();

  useEffect(() => {
    if (!id) throw new Error(`Param id is not valid => id: ${id}`);
    setCurrentCityId(id);
  }, [id, setCurrentCityId]);

  if (currentCity?.id !== id) return <Spinner />;
  if (isLoading) return <Spinner />;
  if (!currentCity)
    return <Message message={`Can not find a city with id: ${id}`} />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button functionType="back">Back</Button>
      </div>
    </div>
  );
}
