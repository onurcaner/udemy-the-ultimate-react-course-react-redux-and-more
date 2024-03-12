// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useCitiesContext } from '../contexts/useCitiesContext';
import { getReverseGeocoding } from '../data/getReverseGeocoding';
import { useFetchWatch } from '../hooks/useFetchWatch';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { Button } from './Button';
import styles from './Form.module.css';
import { Message } from './Message';
import { Spinner } from './Spinner';

export function Form() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [notes, setNotes] = useState('');
  const {
    postCity: { isLoading: isLoadingPost, error: errorPost },
    dispatch,
  } = useCitiesContext();

  const position = useUrlPosition();

  const [reverseGeocoding, isLoadingReverseGeocoding, errorReverseGeocoding] =
    useFetchWatch({
      customFetch: getReverseGeocoding,
      fetchParameter: position,
      initialState: { cityName, country, emoji: '' },
    });

  useEffect(() => {
    const { cityName, country, emoji } = reverseGeocoding;
    setCityName(cityName);
    setCountry(country);
    setEmoji(emoji);
  }, [reverseGeocoding]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!areInputsValid()) return;

    if (!position) return; // Happy typescript
    dispatch({
      type: 'city/will-be-posted',
      payload: {
        cityName,
        country,
        date,
        emoji,
        notes,
        position,
      },
    });
  };

  const createHandleChange = (
    setState: Dispatch<SetStateAction<string>>,
  ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (e) => {
      const { value } = e.target;
      setState(value);
    };
  };

  const areInputsValid = (): boolean => {
    if (cityName && country && date && emoji && notes && position) return true;
    return false;
  };

  if (isLoadingReverseGeocoding) return <Spinner />;

  if (errorReverseGeocoding)
    return (
      <Message message="Can not find a city on clicked location. Try clicking somewhere else 😊" />
    );

  if (errorPost)
    return <Message message="Failed to add new city to your list 😵" />;

  if (!position)
    return <Message message="Start by clicking somewhere on the map 😉" />;

  return (
    <form
      className={`${styles.form} ${isLoadingPost ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          type="text"
          id="cityName"
          onChange={createHandleChange(setCityName)}
          value={cityName}
        />
        {emoji && <span className={styles.flag}>{emoji}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          type="date"
          id="date"
          onChange={createHandleChange(setDate)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={createHandleChange(setNotes)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button functionType="back">&larr; Back</Button>
        <Button
          isDisabled={!areInputsValid()}
          functionType="primary"
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
