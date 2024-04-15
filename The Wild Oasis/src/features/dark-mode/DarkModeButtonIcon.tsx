import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import { ButtonIcon } from '../../ui/ButtonIcon';
import { useContextDarkMode } from './useContextDarkMode';

export function DarkModeButtonIcon(): JSX.Element {
  const { isDarkMode, toggleDarkMode } = useContextDarkMode();

  return (
    <ButtonIcon
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      type="button"
    >
      <span aria-hidden={true}>
        {isDarkMode && <HiOutlineSun />}
        {!isDarkMode && <HiOutlineMoon />}
      </span>
    </ButtonIcon>
  );
}
