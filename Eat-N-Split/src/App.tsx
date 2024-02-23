import { useState, MouseEventHandler } from 'react';

import { Friends } from './components/Friends';
import { AddFriendForm } from './components/AddFriendForm';
import { Button } from './components/Button';
import { SplitBillForm } from './components/SplitBillForm';

import { FriendAttributes, initialFriends } from './data/friendsData';

export function App(): JSX.Element {
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [friends, setFriends] = useState<FriendAttributes[]>(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const selectedFriend = friends.find(
    (friend) => friend.id === selectedFriendId
  );

  const handleClickToShowAddFriendForm: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsAddingFriend(true);
  };

  const handleClickToHideAddFriendForm: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsAddingFriend(false);
  };

  const handleAddFriend = (friendAttributes: FriendAttributes): void => {
    setFriends((friends) => [...friends, friendAttributes]);
    setIsAddingFriend(false);
    setSelectedFriendId(friendAttributes.id);
  };

  const handleSelectingFriend = (id: string): void => {
    setSelectedFriendId(id);
    setIsAddingFriend(false);
  };

  const handleUnselectingFriend = (): void => {
    setSelectedFriendId(null);
  };

  const handleSplitBill = (expense: number): void => {
    addBalanceToSelectedFriend(expense);
    setSelectedFriendId(null);
  };

  const addBalanceToSelectedFriend = (value: number): void => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriendId
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          selectedFriendId={selectedFriendId}
          onSelectingFriend={handleSelectingFriend}
          onUnselectingFriend={handleUnselectingFriend}
        />
        {isAddingFriend && (
          <>
            <AddFriendForm onAddFriend={handleAddFriend} />
            <Button onClick={handleClickToHideAddFriendForm}>Cancel</Button>
          </>
        )}
        {!isAddingFriend && (
          <Button onClick={handleClickToShowAddFriendForm}>Add friend</Button>
        )}
      </div>
      <div>
        {selectedFriend && (
          <SplitBillForm
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}
