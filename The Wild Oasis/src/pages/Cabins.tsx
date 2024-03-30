import { CabinTable } from '../features/cabins/CabinTable';
import { Heading } from '../ui/Heading';

export function Cabins(): JSX.Element {
  return (
    <>
      <Heading as="h2">All cabins</Heading>
      <p>TEST</p>

      <CabinTable />
    </>
  );
}
