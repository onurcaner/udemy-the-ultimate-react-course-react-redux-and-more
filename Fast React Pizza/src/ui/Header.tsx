import { Link } from 'react-router-dom';

import { SearchOrder } from '../features/order/SearchOrder';
import { Username } from '../features/user/Username';

export function Header(): JSX.Element {
  return (
    <header className="flex justify-between gap-x-4 border-b border-stone-200 bg-yellow-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        <h1>Fast React Pizza</h1>
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
