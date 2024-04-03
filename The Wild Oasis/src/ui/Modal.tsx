/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import styled from 'styled-components';

interface ModalContext {
  isWindowOpen: boolean;
  openWindow: () => void;
  closeWindow: () => void;
}

const ModalContext = createContext<ModalContext>({
  isWindowOpen: false,
  openWindow: () => {
    return;
  },
  closeWindow: () => {
    return;
  },
});

function ModalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const openWindow = useCallback(() => {
    setIsWindowOpen(true);
  }, []);

  const closeWindow = useCallback(() => {
    setIsWindowOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isWindowOpen, openWindow, closeWindow }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalButtonContainer({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { openWindow } = useContext(ModalContext);

  return cloneElement(children, { onClick: openWindow });
}

function ModalWindow({ children }: { children: ReactNode }): JSX.Element {
  const { isWindowOpen, closeWindow } = useContext(ModalContext);

  if (!isWindowOpen) return <></>;

  return createPortal(
    <>
      <StyledOverlay onClick={closeWindow} />
      <StyledModal>
        <StyledButton
          onClick={closeWindow}
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
  Context: ModalContext,
  Provider: ModalProvider,
  ButtonContainer: ModalButtonContainer,
  Window: ModalWindow,
};
