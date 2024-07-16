import { CabinCard } from './CabinCard';
import { appRevalidates } from '@/app/_appRevalidates';
import { Ul } from '@/app/_components/Ul';
import { getCabins } from '@/app/_services/apiCabins';
import { CabinsSearchCapacityValues } from '@/app/cabins/_query';

export const revalidate = appRevalidates.cabins;

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
