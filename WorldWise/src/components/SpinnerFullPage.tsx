import { Spinner } from './Spinner';
import styles from './SpinnerFullPage.module.css';

export function SpinnerFullPage(): JSX.Element {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}
