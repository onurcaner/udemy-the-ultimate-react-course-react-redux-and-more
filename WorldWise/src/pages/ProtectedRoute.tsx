import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFakeAuthContext } from '../contexts/useFakeAuthContext';
import { LOGIN } from '../routes';

export function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const { isAuthenticated } = useFakeAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(`/${LOGIN}`);
  }, [isAuthenticated, navigate]);

  return children;
}
