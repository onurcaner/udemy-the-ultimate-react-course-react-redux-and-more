import Image from 'next/image';
import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

import { signInGoogleAction } from './signInActions';
import { Button } from '@/app/_components/Button';

interface SingInGoogleButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  redirectTo?: string | null;
}

export function SignInGoogleButton({
  redirectTo,
  className,
}: SingInGoogleButtonProps): JSX.Element {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signInGoogleAction.bind(null, redirectTo)}>
      <Button
        $variant="outline"
        className={twMerge('flex items-center gap-6', className)}
      >
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
