import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ACCOUNT } from '../config/routePaths';
import { LogoutButton } from '../features/authentication/LogoutButton';
import { ButtonIcon } from './ButtonIcon';

export function HeaderMenu(): JSX.Element {
  const navigate = useNavigate();

  return (
    <StyledUl>
      <li>
        <ButtonIcon
          onClick={() => {
            navigate(`/${ACCOUNT}`);
          }}
          aria-label="Go to account page"
          type="button"
        >
          <span>
            <HiOutlineUser />
          </span>
        </ButtonIcon>
      </li>
      <li>
        <LogoutButton />
      </li>
    </StyledUl>
  );
}

const StyledUl = styled.ul`
  display: flex;
`;
