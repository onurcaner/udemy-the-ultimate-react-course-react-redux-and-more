import type { JSX } from 'react';

import { SpinnerWithMessage } from '@/app/_components/SpinnerWithMessage';

export default function ProfileLoading(): JSX.Element {
  return <SpinnerWithMessage message="loading reservations" />;
}
