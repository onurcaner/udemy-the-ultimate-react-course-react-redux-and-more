import styled from 'styled-components';

import { CustomUserMetadata } from '../../services/types';
import { Empty } from '../../ui/Empty';
import { SpinnerMini } from '../../ui/SpinnerMini';
import { useQueryLoggedInUser } from './useQueryLoggedInUser';
import { useQueryLoggedInUserAvatar } from './useQueryLoggedInUserAvatar';

export function UserAvatar(): JSX.Element {
  const { data: userData, isPending: isPendingData } = useQueryLoggedInUser();
  const { data: avatarData, isPending: isPendingAvatar } =
    useQueryLoggedInUserAvatar();

  const isPending = isPendingData || isPendingAvatar;

  if (isPending)
    return (
      <StyledDiv>
        <SpinnerMini />
        <span>Loading...</span>
      </StyledDiv>
    );

  if (!userData?.user) return <Empty resourceName="logged in user" />;

  const { fullName } = userData.user.user_metadata as CustomUserMetadata;

  return (
    <StyledDiv>
      <StyledImg
        src={
          avatarData
            ? URL.createObjectURL(avatarData)
            : '/logos/default-user.jpg'
        }
        alt={fullName}
      />
      <span>{fullName}</span>
    </StyledDiv>
  );
}

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
