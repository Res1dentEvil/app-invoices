import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
export const store = setupStore();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
