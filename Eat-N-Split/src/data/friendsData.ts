export interface FriendAttributes {
  id: string;
  name: string;
  imageUrl: string;
  balance: number;
}

export const initialFriends: FriendAttributes[] = [
  {
    id: '118836',
    name: 'Clark',
    imageUrl: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: '933372',
    name: 'Sarah',
    imageUrl: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: '499476',
    name: 'Anthony',
    imageUrl: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];
