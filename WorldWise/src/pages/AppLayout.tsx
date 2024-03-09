import styles from './AppLayout.module.css';

import { Sidebar } from '../components/Sidebar';
import { Map } from '../components/Map';

export function AppLayout(): JSX.Element {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
