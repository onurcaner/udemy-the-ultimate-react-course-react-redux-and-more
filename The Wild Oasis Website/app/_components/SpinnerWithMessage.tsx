import { Spinner } from '@/app/_components/Spinner';

export function SpinnerWithMessage({
  message = 'Loading',
}: {
  message?: string;
}): JSX.Element {
  return (
    <div>
      <div className="mt-10 grid justify-center gap-y-5">
        <Spinner />
        <div className="text-lg capitalize">{message}</div>
      </div>
    </div>
  );
}
