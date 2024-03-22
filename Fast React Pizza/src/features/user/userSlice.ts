/* 
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserAttributes } from '../../services/restaurant/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserState extends UserAttributes {}

const initialUserState: UserState = {
  username: '',
  address: '',
  phone: '',
};

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
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = {
  selectUsername: (state: Record<'user', UserState>) => state.user.username,
  selectPhone: (state: Record<'user', UserState>) => state.user.phone,
  selectAddress: (state: Record<'user', UserState>) => state.user.address,
  selectUser: (state: Record<'user', UserState>) => state.user,
};
