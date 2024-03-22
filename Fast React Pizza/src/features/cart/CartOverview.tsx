import { CART } from '../../pageUrls';
import { useAppSelector } from '../../store';
import { CustomLink } from '../../ui/CustomLink';
import { cartSelectors } from './cartSlice';

export function CartOverview(): JSX.Element {
  const numberOfPizzas = useAppSelector(cartSelectors.selectNumberOfPizzas);

  if (!numberOfPizzas) return <></>;

  return (
    <div className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base">
      <div className="mx-auto flex max-w-7xl justify-between gap-x-4">
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          {numberOfPizzas || 'No'} pizza{numberOfPizzas !== 1 && 's'}
        </p>
        <CustomLink
          to={`/${CART}`}
          className="!text-stone-300 hover:!text-stone-200"
        >
          Open cart &rarr;
        </CustomLink>
      </div>
    </div>
  );
}
