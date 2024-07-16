import { H2 } from '@/app/_components/H2';
import { SelectCountry } from '@/app/_components/SelectCountry';
import { UserForm } from '@/app/_features/account/UserForm';

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
            defaultCountry={nationality}
          />
        }
      />
    </>
  );
}
