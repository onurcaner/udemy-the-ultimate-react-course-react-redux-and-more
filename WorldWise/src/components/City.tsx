import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCitiesContext } from '../contexts/useCitiesContext';
import { Button } from './Button';
import styles from './City.module.css';
import { Message } from './Message';
import { Spinner } from './Spinner';

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date ?? ''));

export function City(): JSX.Element {
  const {
    selectedCity: { selectedCity, isLoading },
    dispatch,
  } = useCitiesContext();
  const { id } = useParams();

  useEffect(() => {
    if (!id) throw new Error(`Param id is not valid => id: ${id}`);
    dispatch({ type: 'selectedCityId/will-be-fetched', payload: id });
  }, [id, dispatch]);

  if (selectedCity?.id !== id) return <Spinner />;
  if (isLoading) return <Spinner />;
  if (!selectedCity)
    return <Message message={`Can not find a city with id: ${id}`} />;

  const { cityName, emoji, date, notes } = selectedCity;

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
