import { ReactNode } from 'react';

export interface MainProps {
  children?: ReactNode;
}

export function Main({ children }: MainProps): JSX.Element {
  return <main className="main">{children}</main>;
}
