import { useState, ChangeEventHandler, FormEventHandler } from 'react';

import { FriendAttributes } from '../data/friendsData';

import { Button } from './Button';

enum WhoIsPaying {
  Friend = 'friend',
  User = 'user',
}

export interface SplitBillFormProps {
  selectedFriend: FriendAttributes;
  onSplitBill: (expense: number) => void;
}

export function SplitBillForm({
  selectedFriend,
  onSplitBill,
}: SplitBillFormProps): JSX.Element {
  const { name: friendsName } = selectedFriend;

  const [billValue, setBillValue] = useState<number | null>(null);
  const [userExpense, setUserExpense] = useState<number | null>(null);
  const [whoIsPaying, setWhoIsPaying] = useState<WhoIsPaying>(WhoIsPaying.User);

  const calculateFriendsExpense = (): number | null => {
    if (billValue === null) return null;
    if (userExpense === null) return null;

    return billValue - userExpense;
  };

  const handleChangeOfBillValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setBillValue(+value || null);
  };

  const handleChangeOfUserExpense: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value } = e.target;
    setUserExpense(+value || null);
  };

  const handleChangeOfWhoIsPaying: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const value = e.target.value as WhoIsPaying;
    setWhoIsPaying(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!areInputsValid()) return;

    // Make TypeScript Happy :3
    const friendsExpense = calculateFriendsExpense();
    if (typeof friendsExpense !== 'number' || typeof userExpense !== 'number')
      return;

    if (whoIsPaying === WhoIsPaying.User) onSplitBill(friendsExpense);
    if (whoIsPaying === WhoIsPaying.Friend) onSplitBill(-userExpense);
  };

  const areInputsValid = (): boolean => {
    if (billValue === null) return false;
    if (userExpense === null) return false;
    if (calculateFriendsExpense() === null) return false;

    return true;
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {friendsName}</h2>

      <label htmlFor="split-bill-bill-value">💰Bill value</label>
      <input
        id="split-bill-bill-value"
        type="number"
        value={billValue ?? ''}
        onChange={handleChangeOfBillValue}
      />

      <label htmlFor="split-bill-user-expense">😀Your expense</label>
      <input
        id="split-bill-user-expense"
        type="number"
        value={userExpense ?? ''}
        onChange={handleChangeOfUserExpense}
      />

      <label htmlFor="split-bill-friend-expense">
        😆{friendsName}&apos;s expense
      </label>
      <input
        id="split-bill-friend-expense"
        type="number"
        value={calculateFriendsExpense() ?? ''}
        disabled
      />

      <label htmlFor="split-bill-who-is-paying">
        🤔Who is paying the bill?
      </label>
      <select
        id="split-bill-who-is-paying"
        value={whoIsPaying}
        onChange={handleChangeOfWhoIsPaying}
      >
        <option value={WhoIsPaying.User}>You</option>
        <option value={WhoIsPaying.Friend}>{friendsName}</option>
      </select>

      <Button ariaLabel={`Split bill with ${friendsName}`}>Split bill</Button>
    </form>
  );
}
