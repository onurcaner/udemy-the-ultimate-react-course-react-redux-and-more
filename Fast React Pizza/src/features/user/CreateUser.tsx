import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MENU } from '../../pageUrls';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { userActions, userSelectors } from './userSlice';

export function CreateUser(): JSX.Element {
  const username = useAppSelector(userSelectors.selectUsername);
  const [localUsername, setLocalUsername] = useState(() => username);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!localUsername) return;

    dispatch(userActions.updateName(localUsername));
    navigate(`/${MENU}`);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setLocalUsername(value);
  };

  const randomNumber = Math.random();

  return (
    <form onSubmit={handleSubmit}>
      <Label
        htmlFor={`username_${randomNumber}`}
        className="mb-4 block text-wrap"
      >
        👋 Welcome! Please start by telling us your name:
      </Label>

      <Input
        id={`username_${randomNumber}`}
        type="text"
        placeholder="Your full name"
        value={localUsername}
        onChange={handleChange}
        className="mb-5 max-w-lg"
      />

      {localUsername !== '' && (
        <div>
          <Button>Start ordering, {localUsername}</Button>
        </div>
      )}
    </form>
  );
}
