import type { JSX } from 'react';

import { appRoutes } from '../_appRoutes';
import { appendSearchParams } from '../_utils/appendSearchParams';
import { LoginSearchFields } from '../login/_query';
import { CustomLink } from './CustomLink';

interface LoginMessageProps {
  searchParams?: Record<LoginSearchFields, string | null | undefined>;
}

export function LoginMessage({ searchParams }: LoginMessageProps): JSX.Element {
  const href = searchParams
    ? appendSearchParams(appRoutes.login, searchParams)
    : appRoutes.login;

  return (
    <div className="grid bg-primary-200 dark:bg-primary-800">
      <p className="self-center py-12 text-center text-xl">
        Please <CustomLink href={href}>login</CustomLink> to reserve <br /> this
        cabin right now
      </p>
    </div>
  );
}
