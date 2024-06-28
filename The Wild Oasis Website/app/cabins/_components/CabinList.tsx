import { CabinCard } from './CabinCard';
import { Ul } from '@/app/_components/Ul';
import { revalidates } from '@/app/_revalidates';
import { getCabins } from '@/app/_services/apiCabins';

export const revalidate = revalidates.cabins;

export async function CabinList(): Promise<JSX.Element> {
  const cabins = await getCabins();

  return (
    <Ul>
      {cabins.map((cabin) => (
        <li key={cabin.id}>
          <CabinCard cabin={cabin} />
        </li>
      ))}
    </Ul>
  );
}
