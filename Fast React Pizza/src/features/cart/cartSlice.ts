import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { MinimalCartItemAttributes } from '../../services/restaurant/types';

interface CartState {
  items: MinimalCartItemAttributes[];
  priority: boolean;
}

const initialCartState: CartState = {
  items: [],
  priority: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state: CartState, { payload }: PayloadAction<number>): void {
      const index = state.items.findIndex((item) => item.pizzaId === payload);

      if (index >= 0) state.items[index].quantity += 1;
      else state.items.push({ pizzaId: payload, quantity: 1 });
    },

    deleteItem(state: CartState, { payload }: PayloadAction<number>): void {
      const index = state.items.findIndex((item) => item.pizzaId === payload);

      if (index >= 0) state.items[index].quantity -= 1;
      state.items = state.items.filter((item) => item.quantity > 0);
    },

    clearItem(state: CartState, { payload }: PayloadAction<number>): void {
      state.items = state.items.filter((item) => item.pizzaId !== payload);
    },

    clearCart(state: CartState): void {
      state.items = [];
      state.priority = false;
    },

    setPriority(state: CartState, { payload }: PayloadAction<boolean>): void {
      state.priority = payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelectors = {
  selectCart: (state: Record<'cart', CartState>) => state.cart.items,

  createSelectCartItem: (id: number) =>
    createSelector(
      [(state: Record<'cart', CartState>) => state.cart.items],
      (items) => items.find((item) => item.pizzaId === id),
    ),

  selectNumberOfPizzas: createSelector(
    [(state: Record<'cart', CartState>) => state.cart.items],
    (items) => items.reduce((total, item) => total + item.quantity, 0),
  ),

  selectPriority: (state: Record<'cart', CartState>) => state.cart.priority,
};
