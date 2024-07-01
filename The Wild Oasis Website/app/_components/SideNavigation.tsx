import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

import { CustomNavLink } from './CustomNavLink';
import { SignOutButton } from './SignOutButton';

export function SideNavigation() {
  return (
    <nav className="border-r border-primary-100 dark:border-primary-900">
      <ul className="flex h-full flex-col gap-2 text-lg">
        {navLinks.map((navLink) => (
          <li key={navLink.name}>
            <CustomNavLink
              href={navLink.href}
              className="flex w-full items-center gap-x-4 px-5 py-4 font-semibold hover:bg-primary-800 hover:text-primary-200 aria-[current=page]:bg-primary-800 aria-[current=page]:text-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-800 dark:aria-[current=page]:bg-primary-200 dark:aria-[current=page]:text-primary-800"
            >
              <span aria-hidden="true">{navLink.icon}</span>
              <span>{navLink.name}</span>
            </CustomNavLink>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton className="flex w-full items-center gap-x-4 px-5 py-4 font-semibold transition-colors hover:bg-primary-800 hover:text-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-800" />
        </li>
      </ul>
    </nav>
  );
}

const navLinks: { name: string; href: string; icon: JSX.Element }[] = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="icon" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="icon" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="icon" />,
  },
];
