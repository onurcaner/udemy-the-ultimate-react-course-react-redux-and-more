import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { DASHBOARD } from '../config/routePaths';
import { LoginForm } from '../features/authentication/LoginForm';
import { SupabaseAuthenticatedRole } from '../features/authentication/config';
import { useQueryLoggedInUser } from '../features/authentication/useQueryLoggedInUser';
import { Heading } from '../ui/Heading';
import { Logo } from '../ui/Logo';

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const { data } = useQueryLoggedInUser();

  useEffect(() => {
    if (data?.user?.role === SupabaseAuthenticatedRole)
      navigate(`/${DASHBOARD}`);
  }, [data?.user?.role, navigate]);

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2" $marginBottom="1rem">
        Login to your account
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
}

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 32rem;
  align-content: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  gap: 2rem;
  background-color: var(--color-grey-50);

  & h2 {
    text-align: center;
  }
`;
