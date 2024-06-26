import { CabinCard } from './CabinCard';
import { Ul } from '@/app/_components/Ul';
import { getCabins } from '@/app/_services/apiCabins';

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
