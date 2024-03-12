import { ReactNode, useState } from 'react';

import { UserAttributes, fakeUser } from '../fakeUser';
import { FakeAuthContext } from './FakeAuthContext';

export function FakeAuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserAttributes | null>(null);

  const login = (
    email: string,
    password: string,
  ): 'wrongEmail' | 'wrongPassword' | 'success' => {
    if (email !== fakeUser.email) return 'wrongEmail';
    if (password !== fakeUser.password) return 'wrongPassword';

    setUser(fakeUser);
    setIsAuthenticated(true);
    return 'success';
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <FakeAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}
