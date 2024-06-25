import { Spinner } from './_components/Spinner';

export default function RootLoading(): JSX.Element {
  return (
    <div className="relative grid h-full w-full content-center justify-center">
      <Spinner />
    </div>
  );
}
