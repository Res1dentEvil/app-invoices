import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState, IUser } from '../../../types';

const initialState: IState = {
  isAuth: false,
  isLoading: false,
  currentUser: {} as IUser,
  error: '',
};

export const storeSlice = createSlice({
  name: 'myStore',
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state) {
      state.isLoading = false;
    },
    authFetchingSuccess(state) {
      state.isAuth = true;
      state.isLoading = false;
      state.error = '';
    },
    registrationFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default storeSlice.reducer;
