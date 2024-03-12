import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { PageNav } from '../components/PageNav';
import { useFakeAuthContext } from '../contexts/useFakeAuthContext';
import { fakeUser } from '../fakeUser';
import { APP } from '../routes';
import styles from './Login.module.css';

export function Login(): JSX.Element {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState(fakeUser.email);
  const [password, setPassword] = useState(fakeUser.password);
  const { isAuthenticated, login } = useFakeAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${APP}`, { replace: true });
  }, [isAuthenticated, navigate]);

  const createChangeHandler = (
    setState: Dispatch<SetStateAction<string>>,
  ): ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      const { value } = e.target;
      setState(value);
    };
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <button className="cta">Login</button> */}
          <Button functionType="back" type="button">
            Back
          </Button>
          <Button functionType="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
