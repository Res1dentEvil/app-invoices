import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { Header } from '../Header/Header';
import { Registration } from '../Authorization/Registration';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';
import { Login } from '../Authorization/Login';
import { MainPage } from '../MainPage/MainPage';
import { useAppDispatch } from '../../hooks/redux';
import { auth } from '../../store/reducers/ActionCreators';

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <>
      <Header />
      <main className="main__wrapper">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};
