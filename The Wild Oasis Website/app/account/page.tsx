import type { Metadata } from 'next';
import type { JSX } from 'react';

import { appRevalidates } from '../_appRevalidates';

export const revalidate = appRevalidates.guest;

export const metadata: Metadata = {
  title: 'Account',
};

export default function AccountPage(): JSX.Element {
  return <div>ACCOUNT PAGE</div>;
}
