import { MouseEventHandler } from 'react';

import { useFakeAuthContext } from '../contexts/useFakeAuthContext';
import styles from './User.module.css';

export function User(): JSX.Element {
  const { user, logout } = useFakeAuthContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    logout();
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className={styles.user}>
      <img src={user.avatarUrl} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programmatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
