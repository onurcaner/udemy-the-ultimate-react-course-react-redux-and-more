import { useAppSelector } from '../../store';
import { userSelectors } from './userSlice';

export function Username(): JSX.Element {
  const username = useAppSelector(userSelectors.selectUsername);

  return (
    <>
      {username.length > 0 && (
        <p className="hidden text-sm font-semibold md:block">{username}</p>
      )}
    </>
  );
}
