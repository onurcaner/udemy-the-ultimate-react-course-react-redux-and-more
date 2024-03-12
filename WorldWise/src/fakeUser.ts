export interface UserAttributes {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
}

export const fakeUser: UserAttributes = {
  name: 'Jack',
  email: 'jack@example.com',
  password: '123456',
  avatarUrl: 'https://i.pravatar.cc/100?u=zz',
};
