import React from 'react';
import './App.css';
import { setupStore } from '../store/store';
import { Provider } from 'react-redux';

export const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <main className="main__wrapper">hello world</main>
    </Provider>
  );
};
