import { AppDispatch } from '../store';
import { storeSlice } from './StoreSlice';
import axios, { AxiosError } from 'axios';
import { IAuthBody, ITask } from '../../../types';

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
        console.log('User was created');
      });
    dispatch(storeSlice.actions.registrationFetchingSuccess());
  } catch (e) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(JSON.stringify(error.response?.data)));
  }
};

export const login = (body: IAuthBody) => async (dispatch: AppDispatch) => {
  console.log('logining...');
  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios.post(`${baseURL}/api/auth/login`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(storeSlice.actions.authFetchingSuccess(response.data.user));
    localStorage.setItem('token', response.data.token);
  } catch (e) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(JSON.stringify(error.response?.data)));
  }
};

export const auth = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(storeSlice.actions.authFetchingSuccess(response.data.user));
    localStorage.setItem('token', response.data.token);
  } catch (e) {
    console.log('auth error');
    dispatch(storeSlice.actions.logout);
    const error = e as AxiosError;
    localStorage.removeItem('token');
  }
};

export const createTask = (body: ITask) => async (dispatch: AppDispatch) => {
  console.log('creating task...');

  const formData = new FormData();
  formData.append('owner', body.owner);
  formData.append('description', body.description);
  formData.append('assigned', body.assigned);
  formData.append('articleImage', body.articleImage);
  formData.append('section', body.section);
  formData.append('dateStart', body.dateStart);
  formData.append('dateUpdate', body.dateUpdate);
  formData.append('priority', body.priority);
  formData.append('whoCheckedList', JSON.stringify([]));
  formData.append('completed', 'false');

  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .post(`${baseURL}/api/task/create`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response);
      });
  } catch (e) {
    console.log('error');
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(JSON.stringify(error.response?.data)));
  }
};

export const getAllTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .get(`${baseURL}/api/task`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(storeSlice.actions.setTasksList(response.data));
        dispatch(storeSlice.actions.fetchingSuccess());
      });
  } catch (e) {
    const error = e as AxiosError;
  }
};

export const getTask = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios.get(`${baseURL}/api/task/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(storeSlice.actions.setCurrentTask(response.data));
    // dispatch(storeSlice.actions.fetchingSuccess());
    // console.log(response.data);
  } catch (e) {
    const error = e as AxiosError;
  }
};
