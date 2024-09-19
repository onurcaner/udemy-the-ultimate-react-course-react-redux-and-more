import Image from 'next/image';
import type { JSX } from 'react';

import { signInGoogleAction } from './signInActions';
import { Button } from '@/app/_components/Button';

export function SignInGoogleButton(): JSX.Element {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signInGoogleAction}>
      <Button $variant="secondary" className="flex items-center gap-6">
        <div className="relative h-6 w-6">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
            className="absolute object-contain object-center"
          />
        </div>
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}
