import { CabinsSearchCapacityValues } from '../../cabins/_query';
import { CabinCard } from './CabinCard';
import { Ul } from '@/app/_components/Ul';
import { revalidates } from '@/app/_revalidates';
import { getCabins } from '@/app/_services/apiCabins';

export const revalidate = revalidates.cabins;

export async function CabinList({
  capacityFilterValue,
}: {
  capacityFilterValue: CabinsSearchCapacityValues;
}): Promise<JSX.Element> {
  const cabins = await getCabins();

  const displayCabins = cabins.filter(({ maxCapacity }) => {
    if (capacityFilterValue === CabinsSearchCapacityValues.Small)
      return maxCapacity >= 1 && maxCapacity <= 3;

    if (capacityFilterValue === CabinsSearchCapacityValues.Medium)
      return maxCapacity >= 4 && maxCapacity <= 7;

    if (capacityFilterValue === CabinsSearchCapacityValues.Large)
      return maxCapacity >= 8 && maxCapacity <= 12;

    return true;
  });

  return (
    <Ul>
      {displayCabins.map((cabin) => (
        <li key={cabin.id}>
          <CabinCard cabin={cabin} />
        </li>
      ))}
    </Ul>
  );
}
