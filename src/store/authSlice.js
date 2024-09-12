import { createSlice } from '@reduxjs/toolkit';

import { fetchNewUser, userAuth, userUpdate } from './api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'loading',
    error: null,
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.isAuth = true;
      })
      .addCase(fetchNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        state.isAuth = true;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userUpdate.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
