'use client';

import { useEffect, useState } from 'react';

export function DebugDarkMode(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode((s) => !s);
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    if (!isDarkMode) document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <button
      className="fixed left-2 top-2 z-[9999] rounded-md bg-primary-900 px-4 py-2 leading-none text-primary-100 dark:bg-primary-100 dark:text-primary-900"
      onClick={toggleDarkMode}
    >
      Current: {isDarkMode ? 'dark' : 'light'}
    </button>
  );
}
