import { CustomLink } from './_components/CustomLink';
import { H2 } from './_components/H2';
import { Main } from './_components/Main';

export default function RootNotFound() {
  return (
    <Main className="flex flex-col items-center justify-center">
      <H2 className="text-primary-600 dark:text-primary-400">
        This page could not be found :(
      </H2>

      <div className="flex items-center gap-x-5">
        <CustomLink href="/" $variant="secondary">
          Go back to home
        </CustomLink>
      </div>
    </Main>
  );
}
