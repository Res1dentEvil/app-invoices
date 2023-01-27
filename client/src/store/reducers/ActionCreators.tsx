import { AppDispatch } from '../store';
import { storeSlice } from './StoreSlice';
import axios, { AxiosError } from 'axios';
import { IAuthBody } from '../../../types';

const baseURL = `http://localhost:5000`;

export const registration = (body: IAuthBody) => async (dispatch: AppDispatch) => {
  console.log('registration...');
  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .post(`${baseURL}/api/auth/registration`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
      });
    dispatch(storeSlice.actions.registrationFetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
