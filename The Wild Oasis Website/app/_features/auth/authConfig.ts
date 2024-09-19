import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

import { handleSignIn } from './handleSignIn';
import { appRoutes } from '@/app/_appRoutes';

export const nextAuthConfig: NextAuthConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
    signIn: handleSignIn,
  },
  pages: {
    signIn: appRoutes.login,
  },
};
