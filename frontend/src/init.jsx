import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';

import App from './App';
import reducer, { actions } from './slices/index';

const initApp = () => {
  const socket = io();
  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (newMessage) => {
    store.dispatch(actions.updateCurrentChats(newMessage));
  });

  document.querySelector('html').classList.add('h-100');
  document.querySelector('body').classList.add('h-100', 'bg-light');
  document.querySelector('#root').classList.add('h-100');

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default initApp;
