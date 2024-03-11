import { NavLink } from 'react-router-dom';

import { CITIES, COUNTRIES } from '../routes';
import styles from './AppNav.module.css';

export function AppNav(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={CITIES}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={COUNTRIES}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
