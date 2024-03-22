import { SearchOrder } from '../features/order/SearchOrder';
import { Username } from '../features/user/Username';
import { CustomLink } from './CustomLink';

export function Header(): JSX.Element {
  return (
    <header className="border-b border-stone-200 bg-yellow-400 px-4 py-4 uppercase sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-4">
        <CustomLink
          to="/"
          className="tracking-widest text-stone-700 no-underline hover:text-stone-600"
        >
          <h1>Fast React Pizza</h1>
        </CustomLink>
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}
