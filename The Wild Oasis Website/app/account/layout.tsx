import { ReactNode } from 'react';

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <main className="grid grid-cols-[16rem_1fr]">
      <div>NAVIGATION</div>
      <div>{children}</div>
    </main>
  );
}
