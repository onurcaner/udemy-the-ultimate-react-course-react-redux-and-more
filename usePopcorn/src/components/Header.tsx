import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header>
      <nav className="nav-bar">{children}</nav>
    </header>
  );
}
