import { MouseEventHandler } from 'react';

import { FriendAttributes } from '../data/friendsData';

import { Button } from './Button';

enum BalanceStatus {
  YouAreEven = 1,
  FriendOwesYou,
  YouOweFriend,
}

export interface FriendProps {
  friendAttributes: FriendAttributes;
  selectedFriendId: string | null;
  onSelectingFriend: (id: string) => void;
  onUnselectingFriend: () => void;
}

export function Friend({
  friendAttributes,
  selectedFriendId,
  onSelectingFriend,
  onUnselectingFriend,
}: FriendProps): JSX.Element {
  const { balance, id, imageUrl, name } = friendAttributes;

  let balanceStatus = BalanceStatus.YouAreEven;
  if (balance > 0) balanceStatus = BalanceStatus.FriendOwesYou;
  if (balance < 0) balanceStatus = BalanceStatus.YouOweFriend;
  if (balance === 0) balanceStatus = BalanceStatus.YouAreEven;

  const isSelectedFriend = id === selectedFriendId;

  const formatBalance = (balance: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(Math.abs(balance));

  const handleClickToSelectFriend: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onSelectingFriend(id);
  };

  const handleClickToCancelSelection: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onUnselectingFriend();
  };

  return (
    <>
      <img src={imageUrl} alt={`Portrait of ${name}`} />
      <h3>{name}</h3>

      {balanceStatus === BalanceStatus.YouAreEven && (
        <p>You and {name} are even</p>
      )}
      {balanceStatus === BalanceStatus.FriendOwesYou && (
        <p className="green">
          {name} owes you {formatBalance(balance)}
        </p>
      )}
      {balanceStatus === BalanceStatus.YouOweFriend && (
        <p className="red">
          You owe {name} {formatBalance(balance)}
        </p>
      )}

      {!isSelectedFriend && (
        <Button
          onClick={handleClickToSelectFriend}
          ariaLabel={`Select ${name}`}
        >
          Select
        </Button>
      )}
      {isSelectedFriend && (
        <Button
          onClick={handleClickToCancelSelection}
          ariaLabel={`Cancel selecting ${name}`}
        >
          Cancel
        </Button>
      )}
    </>
  );
}
