import { Link } from 'react-router-dom';

import { CART } from '../../pageUrls';

export function CartOverview(): JSX.Element {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={`/${CART}`}>Open cart &rarr;</Link>
    </div>
  );
}
