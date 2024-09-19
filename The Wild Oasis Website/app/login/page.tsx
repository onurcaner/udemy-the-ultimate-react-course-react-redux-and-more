import type { Metadata } from 'next';

import { H2 } from '../_components/H2';
import { Main } from '../_components/Main';
import { SignInGoogleButton } from '../_features/auth/SignInGoogleButton';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Main className="flex flex-col items-center">
      <H2>Sign in to access your guest area</H2>

      <SignInGoogleButton />
    </Main>
  );
}
