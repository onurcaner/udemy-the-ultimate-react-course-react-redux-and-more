import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import { DebugDarkMode } from './_components/DebugDarkMode';
import { Header } from './_components/Header';
import { authorizeNextjs } from './_services/supabase';
import './_styles/styles.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome | The Wild Oasis',
  },
};

const nextFont = Nunito_Sans({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={
          nextFont.className +
          ' grid min-h-screen grid-rows-[max-content_1fr] bg-primary-50 text-base text-primary-800 antialiased dark:bg-primary-950 dark:text-primary-200'
        }
      >
        <DebugDarkMode />
        <Header />
        {children}
      </body>
    </html>
  );
}
