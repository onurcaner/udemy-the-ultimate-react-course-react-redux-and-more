import { CustomNavLink } from './CustomNavLink';

export function Navigation(): JSX.Element {
  return (
    <nav>
      <ul className="flex items-center gap-16">
        <li>
          <CustomNavLink href="/cabins">Cabins</CustomNavLink>
        </li>
        <li>
          <CustomNavLink href="/about">About</CustomNavLink>
        </li>
        <li>
          <CustomNavLink href="/account">Account</CustomNavLink>
        </li>
      </ul>
    </nav>
  );
}
