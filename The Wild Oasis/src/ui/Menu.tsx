/* eslint-disable react-refresh/only-export-components */
import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

import { useRefOnClickOutside } from '../hooks/useRefOnClickOutside';

interface Position {
  x: number;
  y: number;
}

const MenuContext = createContext<{
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  position: Position;
  setPosition: (position: Position) => void;
}>({
  isMenuOpen: false,
  openMenu: () => {
    return;
  },
  closeMenu: () => {
    return;
  },
  position: { x: 0, y: 0 },
  setPosition: () => {
    return;
  },
});

function MenuProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <MenuContext.Provider
      value={{ isMenuOpen, closeMenu, openMenu, position, setPosition }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function MenuOpenButton(): JSX.Element {
  const { openMenu, setPosition } = useContext(MenuContext);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const main = document.querySelector('main');
    if (!main) {
      console.error('No main');
      return;
    }
    if (!ref.current) {
      console.error('No ref');
      return;
    }

    setPosition({
      x: ref.current.getBoundingClientRect().width * 4,
      y:
        main.scrollTop +
        ref.current.getBoundingClientRect().top -
        ref.current.getBoundingClientRect().height,
    });
    openMenu();
  };

  return (
    <StyledToggle
      type="button"
      aria-label="Open context menu"
      onClick={handleClick}
      ref={ref}
    >
      <span aria-hidden={true}>
        <HiOutlineEllipsisVertical />
      </span>
    </StyledToggle>
  );
}

function MenuList({ children }: { children: ReactNode }): JSX.Element {
  const { isMenuOpen, position, closeMenu } = useContext(MenuContext);
  const ref = useRefOnClickOutside<HTMLUListElement>({
    onClickOutside: closeMenu,
  });

  if (!isMenuOpen) return <></>;

  return (
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>
  );
}

function MenuListItem({ children }: { children: JSX.Element }): JSX.Element {
  return <StyledListItem>{children}</StyledListItem>;
}

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  padding: 0.25rem;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration) ease-in-out;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & span {
    display: flex;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{
  $position: Position;
}>`
  position: absolute;
  z-index: 98;
  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const StyledListItem = styled.li`
  & button {
    display: flex;
    align-items: center;
    gap: 1rem;

    font-size: 0.85rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    transition: all var(--transition-duration) ease-in-out;

    &:hover {
      background-color: var(--color-grey-50);
    }

    & svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
    }
  }
`;

export const Menu = {
  Context: MenuContext,
  Provider: MenuProvider,
  OpenButton: MenuOpenButton,
  List: MenuList,
  ListItem: MenuListItem,
};
