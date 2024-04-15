import { useContext } from 'react';

import { DarkModeContext } from './DarkModeContext';

export function useContextDarkMode() {
  return useContext(DarkModeContext);
}
