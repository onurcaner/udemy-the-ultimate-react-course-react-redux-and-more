'use server';

import { signOut } from './auth';
import { appRoutes } from '@/app/_appRoutes';

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: appRoutes.account });
}
