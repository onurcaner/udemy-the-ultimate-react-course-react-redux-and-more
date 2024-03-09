import styles from './Message.module.css';

export interface MessageProps {
  message: string;
}

export function Message({ message }: MessageProps): JSX.Element {
  return (
    <p className={styles.message}>
      <span role="img" aria-label="Waving hand">
        👋
      </span>{' '}
      {message}
    </p>
  );
}
