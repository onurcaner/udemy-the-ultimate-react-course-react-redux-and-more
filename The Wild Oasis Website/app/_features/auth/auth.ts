import NextAuth from 'next-auth';

import { nextAuthConfig } from './authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);

export const authUser = async () => {
  const session = await auth();
  if (!session) throw new Error('No auth session');

  if (!session.user) throw new Error('No auth session user');

  const { user } = session;

  const modifiedUser: Required<typeof session.user> = {
    email: user.email ?? 'NO_EMAIL',
    id: user.id ?? 'NO_ID',
    image: user.image ?? 'NO_IMAGE',
    name: user.name ?? 'NO_NAME',
  };

  return modifiedUser;
};
