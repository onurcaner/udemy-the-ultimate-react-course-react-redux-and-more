import { ReactNode } from 'react';

import { Main } from '../_components/Main';
import { SideNavigation } from '../_components/SideNavigation';

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
