import { ItemAttributes } from './ItemData';

export enum SortingOrder {
  InputDate = 'input-date',
  Description = 'description',
  IsPacked = 'is-packed',
}

export const sorterByInputDate = (
  current: ItemAttributes,
  next: ItemAttributes
): number => next.id - current.id;

export const sorterByDescription = (
  current: ItemAttributes,
  next: ItemAttributes
): number =>
  current.description.toLowerCase() > next.description.toLowerCase() ? 1 : -1;

export const sorterByIsPacked = (
  current: ItemAttributes,
  next: ItemAttributes
): number => {
  if (current.isPacked === next.isPacked) {
    return sorterByDescription(current, next);
  } else {
    return current.isPacked ? 1 : -1;
  }
};
