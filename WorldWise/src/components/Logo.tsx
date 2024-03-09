import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export function Logo(): JSX.Element {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}
