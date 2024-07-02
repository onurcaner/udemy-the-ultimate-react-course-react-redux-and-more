import { UserForm } from '../_components/UserForm';
import { H2 } from '@/app/_components/H2';
import { SelectCountry } from '@/app/_components/SelectCountry';

export default function ProfilePage(): JSX.Element {
  const nationality = 'portugal';

  return (
    <>
      <H2>Update your guest profile</H2>

      <p className="mb-10">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UserForm
        SelectCountry={
          <SelectCountry
            name="nationality"
            id="nationality"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 dark:bg-primary-800 dark:text-primary-200"
            defaultCountry={nationality}
          />
        }
      />
    </>
  );
}
