import { Link } from 'react-router-dom';

import { CART } from '../../pageUrls';

export function CartOverview(): JSX.Element {
  return (
    <div className="flex justify-between gap-x-4 bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={`/${CART}`}>Open cart &rarr;</Link>
    </div>
  );
}
