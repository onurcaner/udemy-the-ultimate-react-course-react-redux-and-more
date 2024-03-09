import { Outlet } from 'react-router-dom';

import styles from './Sidebar.module.css';

import { AppNav } from './AppNav';
import { Logo } from './Logo';
import { Footer } from './Footer';

export function Sidebar(): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
