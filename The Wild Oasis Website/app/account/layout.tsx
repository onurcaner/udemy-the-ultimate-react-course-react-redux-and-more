import type { JSX, ReactNode } from 'react';

import { Main } from '@/app/_components/Main';
import { SideNavigation } from '@/app/_components/SideNavigation';

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="grid grid-cols-[16rem_1fr_16rem]">
      <SideNavigation />
      <Main>{children}</Main>
      <div></div>
    </div>
  );
}
