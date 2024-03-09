import styles from './Spinner.module.css';

export function Spinner(): JSX.Element {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
