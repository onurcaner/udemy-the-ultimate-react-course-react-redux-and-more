import { FormEventHandler, useState, ChangeEventHandler } from 'react';

import { default_image_url_of_friend } from '../config';
import { FriendAttributes } from '../data/friendsData';

import { Button } from './Button';

export interface AddFriendFormProps {
  onAddFriend: (friendAttributes: FriendAttributes) => void;
}

export function AddFriendForm({
  onAddFriend,
}: AddFriendFormProps): JSX.Element {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const clearInputs = (): void => {
    setName('');
    setImageUrl('');
  };

  const handleOnChangeOfName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleOnChangeOfImageUrl: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value } = e.target;
    setImageUrl(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!areInputsValid()) return;

    const friend = buildFriendAttributes();
    onAddFriend(friend);

    clearInputs();
  };

  const areInputsValid = (): boolean => {
    return Boolean(name);
  };

  const buildFriendAttributes = (): FriendAttributes => {
    const id = crypto.randomUUID();
    return {
      balance: 0,
      imageUrl: imageUrl || `${default_image_url_of_friend}?u=${id}`,
      id,
      name,
    };
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="add-friend-name">😁Name*</label>
      <input
        id="add-friend-name"
        type="text"
        placeholder="Steve"
        value={name}
        onChange={handleOnChangeOfName}
        required
      />

      <label htmlFor="add-friend-image-url">🖼️Image URL</label>
      <input
        id="add-friend-image-url"
        type="text"
        placeholder="https://..."
        value={imageUrl}
        onChange={handleOnChangeOfImageUrl}
      />

      <Button>Add friend</Button>
    </form>
  );
}
