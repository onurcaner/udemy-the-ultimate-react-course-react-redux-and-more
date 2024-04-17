import { ReactNode, useEffect } from 'react';

import { useStateLocalStorage } from '../../hooks/useStateLocalStorage';
import { DarkModeContext } from './DarkModeContext';

export function DarkModeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useStateLocalStorage(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'darkMode',
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (!isDarkMode) {
      htmlElement.classList.add('light-mode');
      htmlElement.classList.remove('dark-mode');
    }
    if (isDarkMode) {
      htmlElement.classList.add('dark-mode');
      htmlElement.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (): void => {
    setIsDarkMode((s) => !s);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
