import styled from 'styled-components';

import { CustomUserMetadata } from '../../services/types';
import { Spinner } from '../../ui/Spinner';
import { useQueryLoggedInUser } from './useQueryLoggedInUser';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-200);
  outline: var(--color-grey-100) solid 2px;
`;

export function UserAvatar(): JSX.Element {
  const { data, isPending } = useQueryLoggedInUser();

  if (isPending) return <Spinner />;
  if (!data?.user) return <></>;

  const { avatarUrl, fullName } = data.user.user_metadata as CustomUserMetadata;

  return (
    <StyledDiv>
      <StyledImg src={avatarUrl} alt={fullName} />
      <span>{fullName}</span>
    </StyledDiv>
  );
}
