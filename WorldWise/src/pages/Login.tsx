import { useState, ChangeEventHandler, SetStateAction, Dispatch } from 'react';

import styles from './Login.module.css';

import { PageNav } from '../components/PageNav';

export function Login(): JSX.Element {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const createChangeHandler = (
    setState: Dispatch<SetStateAction<string>>
  ): ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      const { value } = e.target;
      setState(value);
    };
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={createChangeHandler(setEmail)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={createChangeHandler(setPassword)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">Login</button>
        </div>
      </form>
    </main>
  );
}
