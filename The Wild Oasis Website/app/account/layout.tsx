import { ReactNode } from 'react';

import { SideNavigation } from '../_components/SideNavigation';

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <main className="grid grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div>{children}</div>
    </main>
  );
}
