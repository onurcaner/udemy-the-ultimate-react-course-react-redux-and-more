import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserAttributes } from '../../services/restaurant/types';
import { getAddressFromGeocoding } from '../../services/reverse-geocoding/getAddressFromGeocoding';
import { Position } from '../../services/reverse-geocoding/types';

interface UserState extends UserAttributes {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: Error | GeolocationPositionError | null;
  position: Position | null;
}

const initialUserState: UserState = {
  username: '',
  address: '',
  phone: '',
  status: 'idle',
  error: null,
  position: null,
};

const getAddressThunk = createAsyncThunk(
  'user/getAddress',
  getAddressFromGeocoding,
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateName(state: UserState, { payload }: PayloadAction<string>): void {
      state.username = payload;
    },

    updateAddress(state: UserState, { payload }: PayloadAction<string>): void {
      state.address = payload;
    },

    updatePhone(state: UserState, { payload }: PayloadAction<string>): void {
      state.phone = payload;
    },

    updateUser(
      state: UserState,
      { payload }: PayloadAction<UserAttributes>,
    ): void {
      const { address, phone, username } = payload;
      state.address = address;
      state.phone = phone;
      state.username = username;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAddressThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getAddressThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.address = payload.address;
      })
      .addCase(getAddressThunk.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = new Error(error.message);
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = { ...userSlice.actions, getAddressThunk };
export const userSelectors = {
  selectUsername: (state: Record<'user', UserState>) => state.user.username,
  selectPhone: (state: Record<'user', UserState>) => state.user.phone,
  selectAddress: (state: Record<'user', UserState>) => state.user.address,
  selectUser: (state: Record<'user', UserState>) => state.user,
};
