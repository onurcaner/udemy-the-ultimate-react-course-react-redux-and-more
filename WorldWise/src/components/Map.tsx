import { useSearchParams } from 'react-router-dom';

import styles from './Map.module.css';

export function Map(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  console.log(searchParams);

  return (
    <div className={styles.mapContainer}>
      {lat} {lng}
    </div>
  );
}
