export interface ItemAttributes {
  id: number;
  description: string;
  quantity: number;
  isPacked: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewItemAttributes extends Omit<ItemAttributes, 'id'> {}

export const initialItems: ItemAttributes[] = [
  { id: 1, description: 'Passport', quantity: 1, isPacked: true },
  { id: 2, description: 'Socks', quantity: 15, isPacked: false },
  { id: 3, description: 'Pants', quantity: 3, isPacked: false },
  { id: 4, description: 'Shirts', quantity: 8, isPacked: false },
  { id: 5, description: 'Wall charger', quantity: 1, isPacked: true },
];
