// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { getReverseGeocoding } from '../data/getReverseGeocoding';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { Button } from './Button';
import styles from './Form.module.css';

export function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const position = useUrlPosition();

  useEffect(() => {
    if (!position) return;

    const abortController = new AbortController();
    getReverseGeocoding(position, { signal: abortController.signal })
      .then(({ cityName, country }) => {
        setCityName(cityName);
        setCountry(country);
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') return;
        console.error(error);
      });
  }, [position]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const createHandleChange = (
    setState: Dispatch<SetStateAction<string>>,
  ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (e) => {
      const { value } = e.target;
      setState(value);
    };
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          type="text"
          id="cityName"
          onChange={createHandleChange(setCityName)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
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
        <Button functionType="primary">Add</Button>
      </div>
    </form>
  );
}
