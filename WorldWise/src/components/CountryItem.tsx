import styles from './CountryItem.module.css';

import { CountryAttributes } from '../data/types';

export interface CountryItemProps {
  country: CountryAttributes;
}

export function CountryItem({
  country: { country, emoji },
}: CountryItemProps): JSX.Element {
  return (
    <li className={styles.countryItem}>
      <span role="img" aria-label="Country emoji">
        {emoji}
      </span>
      <span>{country}</span>
    </li>
  );
}
