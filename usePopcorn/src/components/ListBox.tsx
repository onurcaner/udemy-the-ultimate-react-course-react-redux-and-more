import { useState, ReactNode } from 'react';

import { ShowHideButton } from './ShowHideButton';

interface ListBoxProps {
  children: ReactNode;
}

export function ListBox({ children }: ListBoxProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <section className="box">
      <ShowHideButton isOpen={isOpen} onClick={handleClick} />
      {isOpen && children}
    </section>
  );
}
