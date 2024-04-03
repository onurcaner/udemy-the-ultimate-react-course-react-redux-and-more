/* eslint-disable react-refresh/only-export-components */
import {
  MouseEventHandler,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import styled from 'styled-components';

interface ModalContext {
  openWindowName: string;
  setOpenWindowName: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ModalContext>({
  openWindowName: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpenWindowName: () => {},
});

function Provider({ children }: { children: ReactNode }): JSX.Element {
  const [openWindowName, setOpenWindowName] = useState('');

  return (
    <Context.Provider value={{ openWindowName, setOpenWindowName }}>
      {children}
    </Context.Provider>
  );
}

function ButtonContainer({
  children,
  windowNameFor,
}: {
  children: JSX.Element;
  windowNameFor: string;
}): JSX.Element {
  const { setOpenWindowName } = useContext(Context);

  const handleClick: MouseEventHandler = () => {
    setOpenWindowName(windowNameFor);
  };

  return cloneElement(children, { onClick: handleClick });
}

function Window({
  children,
  windowName,
}: {
  children: ReactNode;
  windowName: string;
}): JSX.Element {
  const { openWindowName, setOpenWindowName } = useContext(Context);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setOpenWindowName('');
  };

  if (openWindowName !== windowName) return <></>;

  return createPortal(
    <>
      <StyledOverlay onClick={handleClick} />
      <StyledModal>
        <StyledButton
          onClick={handleClick}
          type="button"
          aria-label="Close modal window"
        >
          <span>
            <HiOutlineXMark />
          </span>
        </StyledButton>
        {children}
      </StyledModal>
    </>,
    document.querySelector('#portal-target') ?? document.body,
  );
}

const StyledModal = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  max-height: 80vh;
  max-height: 80dvh;
  overflow: auto;
  padding: 4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-duration) ease-in-out;
`;

const StyledOverlay = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 99;
  transition: all var(--transition-duration) ease-in-out;
  cursor: default;
`;

const StyledButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  color: var(--color-grey-500);
  padding: 0.25rem;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration) ease-in-out;

  &:hover {
    color: var(--color-brand-700);
    background-color: var(--color-grey-100);
  }

  & span {
    display: flex;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: currentColor;
  }
`;

export const Modal = {
  Context,
  Provider,
  ButtonContainer,
  Window,
};
