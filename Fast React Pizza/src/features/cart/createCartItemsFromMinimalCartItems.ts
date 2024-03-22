import {
  CartItemAttributes,
  MenuItemAttributes,
  MinimalCartItemAttributes,
} from '../../services/restaurant/types';

export function createCartItemsFromMinimalCartItems(
  minimalItems: MinimalCartItemAttributes[],
  menu: MenuItemAttributes[],
): CartItemAttributes[] {
  return minimalItems.map((minimalItem) => {
    const menuItem = menu.find((item) => item.id === minimalItem.pizzaId);
    if (!menuItem)
      throw new Error(`No pizza exist with id: ${minimalItem.pizzaId}`);

    const cartItem: CartItemAttributes = {
      name: menuItem.name,
      pizzaId: menuItem.id,
      quantity: minimalItem.quantity,
      unitPrice: menuItem.unitPrice,
      totalPrice: minimalItem.quantity * menuItem.unitPrice,
    };

    return cartItem;
  });
}
