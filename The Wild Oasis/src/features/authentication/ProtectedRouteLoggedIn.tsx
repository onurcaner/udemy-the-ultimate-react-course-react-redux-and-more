import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN } from '../../config/routePaths';
import { SpinnerFullPage } from '../../ui/SpinnerFullPage';
import { SupabaseAuthenticatedRole } from './config';
import { useQueryLoggedInUser } from './useQueryLoggedInUser';

export function ProtectedRouteLoggedIn({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryLoggedInUser();

  useEffect(() => {
    if (isLoading) return;
    if (data?.user?.role === SupabaseAuthenticatedRole) return;

    navigate(`/${LOGIN}`);
  }, [data, isLoading, navigate]);

  if (isLoading) return <SpinnerFullPage />;
  if (data?.user?.role === SupabaseAuthenticatedRole) return <>{children}</>;
  else return <></>;
}
