import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { Header } from '../Header/Header';
import { Registration } from '../Registration/Registration';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';

export const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="main__wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Provider>
  );
};
