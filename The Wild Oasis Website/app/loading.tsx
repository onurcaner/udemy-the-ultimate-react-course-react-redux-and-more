import type { JSX } from 'react';

import { SpinnerWithMessage } from '@/app/_components/SpinnerWithMessage';

export default function RootLoading(): JSX.Element {
  return <SpinnerWithMessage message="loading page" />;
}
