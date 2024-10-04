import NextAuth from 'next-auth';

import { nextAuthConfig } from './authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
