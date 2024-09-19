'use server';

import { signIn } from './auth';
import { appRoutes } from '@/app/_appRoutes';

export async function signInGoogleAction(): Promise<void> {
  await signIn('google', { redirectTo: appRoutes.account });
}
