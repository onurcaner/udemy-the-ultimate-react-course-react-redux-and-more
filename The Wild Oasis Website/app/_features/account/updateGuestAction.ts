'use server';

import { revalidatePath } from 'next/cache';

import { authUser } from '../auth/auth';
import type { UpdateGuestFormFields } from './types';
import { appRoutes } from '@/app/_appRoutes';
import { getGuest, updateGuest } from '@/app/_services/apiGuests';
import type { UpdateGuestAttributes } from '@/app/_services/types';

export async function updateGuestAction(formData: FormData) {
  const { email } = await authUser();
  if (!email) throw new Error('You are not logged in');

  const guest = await getGuest(email);
  if (!guest) throw new Error('There is no guest existing with your email');

  const formFields = Object.fromEntries(
    formData.entries(),
  ) as UpdateGuestFormFields;

  const updateGuestFields: Required<UpdateGuestAttributes> = {
    countryFlag: formFields.nationality.split('%').at(1) ?? '',
    nationality: formFields.nationality.split('%').at(0) ?? '',
    nationalId: formFields.nationalId,
  };

  if (Object.values(updateGuestFields).some((value) => value.length > 50))
    throw new Error('An entered field value is too long');

  await updateGuest(guest.id, updateGuestFields);
  revalidatePath(appRoutes.profile);
}
