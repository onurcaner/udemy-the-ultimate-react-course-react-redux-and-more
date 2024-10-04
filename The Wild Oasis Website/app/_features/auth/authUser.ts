import { auth } from './auth';
import defaultUserImage from '@/app/_assets/default-user.jpg';

export const authUser = async () => {
  const session = await auth();
  if (!session) throw new Error('No auth session');

  if (!session.user) throw new Error('No auth session user');

  const { user } = session;

  const modifiedUser: Required<typeof session.user> = {
    email: user.email ?? 'NO_EMAIL',
    id: user.id ?? 'NO_ID',
    image: user.image ?? (defaultUserImage as unknown as string),
    name: user.name ?? 'NO_NAME',
  };

  return modifiedUser;
};
