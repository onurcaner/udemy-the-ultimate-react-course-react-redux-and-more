import type { Metadata } from 'next';

import { H2 } from '../_components/H2';
import { Main } from '../_components/Main';
import { SignInGoogleButton } from '../_features/auth/SignInGoogleButton';
import { LoginSearchFields } from './_query';

interface LoginPageQuery {
  searchParams: { [LoginSearchFields.RedirectTo]?: string };
}

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage({ searchParams }: LoginPageQuery) {
  const { redirectTo } = searchParams;
  return (
    <Main className="flex flex-col items-center">
      <H2>Sign in to access your guest area</H2>
      <div className="flex flex-col gap-4">
        <SignInGoogleButton redirectTo={redirectTo} />
        <SignInGoogleButton redirectTo={redirectTo} />
        <SignInGoogleButton redirectTo={redirectTo} />
      </div>
    </Main>
  );
}
