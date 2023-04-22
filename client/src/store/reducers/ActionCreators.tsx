import axios, { AxiosError } from 'axios';

import { IAuthBody, IFileCloudinary, ITask } from '../../services/types';
import { AppDispatch } from '../store';
import { storeSlice } from './StoreSlice';
import React from 'react';

const baseURL = `http://localhost:5000`;

export const registration = (body: IAuthBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(storeSlice.actions.fetchingStart());
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

export const login =
  (body: IAuthBody, setError: (value: { message: string }) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(storeSlice.actions.fetchingStart());
      const response = await axios.post(`${baseURL}/api/auth/login`, body, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(storeSlice.actions.authFetchingSuccess(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(JSON.stringify(error.response?.data)));
      setError(error.response?.data as { message: string });
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
    dispatch(storeSlice.actions.logout());
    const error = e as AxiosError;
    localStorage.removeItem('token');
  }
};

export const uploadFile =
  (body: ITask, setIsShowAlert: (arg0: boolean) => void) => async (dispatch: AppDispatch) => {
    const data = new FormData();
    data.append('uploadFile', body.fileLink);

    try {
      const response = await axios
        .post(`${baseURL}/api/file/upload`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          if (response.statusText === 'OK') {
            dispatch(createTask(body, response.data, setIsShowAlert));
          } else {
            alert('Помилка завантаження файлу');
          }
        });
    } catch (e) {
      console.log('uploadFile error');
    }
  };

export const deleteFile = (id: string, fileName: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios
      .post(
        `${baseURL}/api/file/delete`,
        { fileName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((response) => {
        if (response.statusText === 'OK') {
          dispatch(deleteTask(id));
        } else {
          alert('Помилка видалення файлу або завдання');
        }
      });
  } catch (e) {
    console.log('uploadFile error');
  }
};

export const createTask =
  (body: ITask, file: IFileCloudinary, setIsShowAlert: (arg0: boolean) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(storeSlice.actions.fetchingStart());
      const response = await axios
        .post(
          `${baseURL}/api/task/create`,
          { ...body, fileLink: file.path, fileCloudinary: file },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        .then((response) => {
          if (response.statusText === 'OK') {
            setIsShowAlert(true);
          }
        });
    } catch (e) {
      console.log('error');
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(JSON.stringify(error.response?.data)));
    }
  };

export const deleteTask = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/task/delete/${id}`,

      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  } catch (e) {
    const error = e as AxiosError;
  }
};

export const getAllTasks = (role: string) => async (dispatch: AppDispatch) => {
  if (role === 'USER') {
    dispatch(storeSlice.actions.setTasksList([] as ITask[]));
  } else {
    try {
      dispatch(storeSlice.actions.fetchingStart());
      const response = await axios
        .get(`${baseURL}/api/task`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          dispatch(storeSlice.actions.setTasksList(response.data.reverse()));
          dispatch(storeSlice.actions.fetchingEnd());
        });
    } catch (e) {
      const error = e as AxiosError;
    }
  }
};

export const getTask = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(storeSlice.actions.fetchingStart());
    const response = await axios.get(`${baseURL}/api/task/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(storeSlice.actions.setCurrentTask(response.data));
  } catch (e) {
    const error = e as AxiosError;
  }
};

export const editTask =
  (
    id: string,
    description: string,
    assigned: string,
    setError: (value: { message: string }) => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/task/edit/${id}`,
        {
          id,
          description,
          assigned,
          dateUpdate: Date.now(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(storeSlice.actions.setCurrentTask(response.data));
    } catch (e) {
      const error = e as AxiosError;
      setError(error.response?.data as { message: string });
    }
  };

export const changeDestination =
  (id: string, assigned: string, userRole: string, whoCheckedList: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/task/edit/destination/${id}`,
        {
          id,
          assigned,
          dateUpdate: Date.now(),
          userRole,
          whoCheckedList,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(storeSlice.actions.setCurrentTask(response.data));
    } catch (e) {
      const error = e as AxiosError;
    }
  };

export const changePaymentStatus =
  (id: string, paymentStatus: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/task/edit/status/${id}`,
        {
          id,
          completed: paymentStatus,
          dateUpdate: Date.now(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(storeSlice.actions.setCurrentTask(response.data));
    } catch (e) {
      const error = e as AxiosError;
    }
  };
