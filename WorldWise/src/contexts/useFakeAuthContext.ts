import { useContext } from 'react';

import { FakeAuthContext, FakeAuthContextValue } from './FakeAuthContext';

export function useFakeAuthContext(): FakeAuthContextValue {
  const fakeAuthContext = useContext(FakeAuthContext);
  if (!fakeAuthContext)
    throw new Error(
      'Can not consume FakeAuthContext outside of FakeAuthProvider',
    );
  return fakeAuthContext;
}
