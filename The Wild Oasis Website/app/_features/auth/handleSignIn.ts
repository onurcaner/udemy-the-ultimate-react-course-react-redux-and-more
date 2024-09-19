import { NextAuthConfig } from 'next-auth';

import { appRevalidates } from '@/app/_appRevalidates';
import { createGuest, getGuest } from '@/app/_services/apiGuests';

export const revalidate = appRevalidates.guest;

export const handleSignIn: Required<
  Required<NextAuthConfig>['callbacks']
>['signIn'] = async ({ user }) => {
  if (!user.email || !user.name) return false;

  const currentGuest = await getGuest(user.email);

  if (!currentGuest) {
    await createGuest({
      email: user.email,
      fullName: user.name,
    });
  }

  return true;
};
