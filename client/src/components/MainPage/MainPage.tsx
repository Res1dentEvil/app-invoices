import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);
  const router = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      router('/login');
    }
  }, [isAuth]);
  return (
    <div>
      <h1>Main page</h1>
    </div>
  );
};
