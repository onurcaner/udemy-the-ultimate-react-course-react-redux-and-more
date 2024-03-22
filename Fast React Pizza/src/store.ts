import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { cartReducer } from './features/cart/cartSlice';
import { userReducer } from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector as TypedUseSelectorHook<AppState>;
export const useAppDispatch = useDispatch as () => AppDispatch;
