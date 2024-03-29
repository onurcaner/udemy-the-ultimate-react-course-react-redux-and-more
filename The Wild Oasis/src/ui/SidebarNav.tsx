import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  BOOKINGS,
  CABINS,
  DASHBOARD,
  SETTINGS,
  USERS,
} from '../config/routePaths';

const StyledList = styled.ul`
  display: grid;
  row-gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 1.125rem;
  line-height: 1;
  font-weight: 400;
  color: var(--color-grey-600);
  padding: 1rem 2rem;
  outline: transparent solid 2px;

  &,
  & svg {
    transition: all var(--transition-duration) ease-in-out;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-400);
  }

  &:hover,
  &:focus-visible,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  &:focus-visible {
    outline-color: var(--color-brand-600);
    outline-offset: 2px;
  }

  &:hover svg,
  &:focus-visible svg,
  &:active svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

export function SidebarNav(): JSX.Element {
  return (
    <nav>
      <StyledList>
        <li>
          <StyledNavLink to={`/${DASHBOARD}`}>
            <span>
              <HiOutlineHome />
            </span>
            <span>Dashboard</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to={`/${BOOKINGS}`}>
            <span>
              <HiOutlineCalendarDays />
            </span>
            <span>Bookings</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to={`/${CABINS}`}>
            <span>
              <HiOutlineHomeModern />
            </span>
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to={`/${USERS}`}>
            <span>
              <HiOutlineUsers />
            </span>
            <span>Users</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to={`/${SETTINGS}`}>
            <span>
              <HiOutlineCog6Tooth />
            </span>
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </StyledList>
    </nav>
  );
}
