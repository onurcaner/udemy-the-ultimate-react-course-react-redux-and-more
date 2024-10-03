import type { JSX } from 'react';

import { H2 } from '@/app/_components/H2';
import { SelectCountry } from '@/app/_components/SelectCountry';
import { UserForm } from '@/app/_features/account/UserForm';
import { GuestFormKeys } from '@/app/_features/account/types';
import { authUser } from '@/app/_features/auth/auth';
import { getGuest } from '@/app/_services/apiGuests';

export default async function ProfilePage(): Promise<JSX.Element> {
  const { email } = await authUser();
  if (!email) throw new Error('email is null');

  const guest = await getGuest(email);
  if (!guest) throw new Error('guest is null');

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
            name={GuestFormKeys.Nationality}
            id={GuestFormKeys.Nationality}
            defaultCountry={guest.nationality}
          />
        }
        guest={guest}
      />
    </>
  );
}
