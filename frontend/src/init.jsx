import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './Components/App';
import reducer, { actions } from './Store/index';

const initApp = () => {
  const socket = io();
  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (newMessage) => {
    console.log('socket --- newMessage -', newMessage);
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
