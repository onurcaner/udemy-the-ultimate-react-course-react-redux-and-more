import { createContext } from 'react';

import { UserAttributes } from '../fakeUser';

export const FakeAuthContext = createContext<
  FakeAuthContextValue | null | undefined
>(null);

export interface FakeAuthContextValue {
  isAuthenticated: boolean;
  user: UserAttributes | null;
  login: (
    email: string,
    password: string,
  ) => 'wrongEmail' | 'wrongPassword' | 'success';
  logout: () => void;
}
