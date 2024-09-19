import type { JSX } from 'react';

import { appRoutes } from '../_appRoutes';
import { CustomLink } from './CustomLink';

export function LoginMessage(): JSX.Element {
  return (
    <div className="grid bg-primary-200 dark:bg-primary-800">
      <p className="self-center py-12 text-center text-xl">
        Please <CustomLink href={appRoutes.login}>login</CustomLink> to reserve{' '}
        <br /> this cabin right now
      </p>
    </div>
  );
}
