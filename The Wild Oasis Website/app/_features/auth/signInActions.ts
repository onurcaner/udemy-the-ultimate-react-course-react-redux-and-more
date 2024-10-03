'use server';

import { signIn } from './auth';
import { appRoutes } from '@/app/_appRoutes';

export async function signInGoogleAction(
  redirectTo?: string | null,
): Promise<void> {
  await signIn('google', { redirectTo: redirectTo ?? appRoutes.account });
}
