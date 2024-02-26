import { MouseEventHandler } from 'react';

export interface ShowHideButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ShowHideButton({
  isOpen,
  onClick,
}: ShowHideButtonProps): JSX.Element {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClick();
  };

  return (
    <button className="btn-toggle" onClick={handleClick}>
      {isOpen ? '➖' : '➕'}
    </button>
  );
}
