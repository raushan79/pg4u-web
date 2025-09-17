import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
