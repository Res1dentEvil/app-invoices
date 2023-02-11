import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState, ITask, IUser } from '../../services/types';

const initialState: IState = {
  isAuth: !!localStorage.getItem('token'),
  // isAuth: false,
  isLoading: false,
  currentUser: {} as IUser,
  tasksList: [] as ITask[],
  currentTask: {} as ITask,
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
    authFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = '';
    },
    registrationFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      if (action.payload.length) {
        state.error = JSON.parse(action.payload).message;
      } else {
        state.error = action.payload;
      }
    },
    logout(state) {
      state.isAuth = false;
      state.currentUser = {} as IUser;
      localStorage.removeItem('token');
      console.log('logout...');
    },
    setTasksList(state, action: PayloadAction<ITask[]>) {
      state.tasksList = action.payload;
    },
    setCurrentTask(state, action: PayloadAction<ITask>) {
      state.currentTask = action.payload;
    },
  },
});

export default storeSlice.reducer;
