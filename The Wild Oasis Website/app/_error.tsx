'use client';

import { Button } from './_components/Button';
import { CustomLink } from './_components/CustomLink';
import { H2 } from './_components/H2';
import { Main } from './_components/Main';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  return (
    <Main className="flex flex-col items-center justify-center">
      <H2 className="text-primary-600 dark:text-primary-400">
        Something went wrong!
      </H2>
      <p className="mb-16 text-lg">{error.message}</p>

      <div className="flex items-center gap-x-5">
        <CustomLink href="./" $variant="underline" className="mx-[2em]">
          Go back
        </CustomLink>
        <Button onClick={reset} $variant="secondary">
          Try again
        </Button>
      </div>
    </Main>
  );
}
