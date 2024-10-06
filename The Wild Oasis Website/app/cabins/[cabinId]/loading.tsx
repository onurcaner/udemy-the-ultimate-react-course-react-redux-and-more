import type { JSX } from 'react';

import { SpinnerWithMessage } from '@/app/_components/SpinnerWithMessage';

export default function CabinLoading(): JSX.Element {
  return <SpinnerWithMessage message="loading cabin page" />;
}
