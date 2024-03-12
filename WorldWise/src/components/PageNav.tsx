import { NavLink } from 'react-router-dom';

import { useFakeAuthContext } from '../contexts/useFakeAuthContext';
import { LOGIN, PRICING, PRODUCT } from '../routes';
import { Logo } from './Logo';
import styles from './PageNav.module.css';

export function PageNav(): JSX.Element {
  const { isAuthenticated } = useFakeAuthContext();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={`/${PRICING}`}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={`/${PRODUCT}`}>Product</NavLink>
        </li>
        <li>
          <NavLink to={`/${LOGIN}`} className={styles.ctaLink}>
            {isAuthenticated ? 'App' : 'Log in'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
