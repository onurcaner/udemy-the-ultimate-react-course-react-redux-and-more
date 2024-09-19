import type { JSX } from 'react';

import { Logo } from '@/app/_components/Logo';
import { Navigation } from '@/app/_components/Navigation';

export function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-10 border-b border-primary-200/80 bg-primary-100/80 px-8 py-5 backdrop-blur-sm dark:border-primary-800/80 dark:bg-primary-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
