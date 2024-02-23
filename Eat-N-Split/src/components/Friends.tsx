import { Friend } from './Friend';

import { FriendAttributes } from '../data/friendsData';

export interface FriendsProps {
  friends: FriendAttributes[];
  selectedFriendId: string | null;
  onSelectingFriend: (id: string) => void;
  onUnselectingFriend: () => void;
}

export function Friends({
  friends,
  selectedFriendId,
  onSelectingFriend,
  onUnselectingFriend,
}: FriendsProps): JSX.Element {
  const renderFriend = (friend: FriendAttributes): JSX.Element => {
    const { id, name } = friend;
    return (
      <li
        className={id === selectedFriendId ? 'selected' : undefined}
        key={`${name}_${id}`}
      >
        <Friend
          friendAttributes={friend}
          {...{ selectedFriendId, onSelectingFriend, onUnselectingFriend }}
        />
      </li>
    );
  };

  return <ul>{friends.map(renderFriend)}</ul>;
}
