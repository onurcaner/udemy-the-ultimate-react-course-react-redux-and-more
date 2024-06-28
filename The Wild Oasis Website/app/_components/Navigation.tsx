import { appRoutes } from '../_appRoutes';
import { CustomNavLink } from './CustomNavLink';

export function Navigation(): JSX.Element {
  return (
    <nav>
      <ul className="flex items-center gap-16">
        <li>
          <CustomNavLink href={appRoutes.cabins}>Cabins</CustomNavLink>
        </li>
        <li>
          <CustomNavLink href={appRoutes.about}>About</CustomNavLink>
        </li>
        <li>
          <CustomNavLink href={appRoutes.account}>Account</CustomNavLink>
        </li>
      </ul>
    </nav>
  );
}
