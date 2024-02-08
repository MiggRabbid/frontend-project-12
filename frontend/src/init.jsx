import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';

import App from './Components/App';
import reducer, { actions } from './slices/index';

const initApp = () => {
  const socket = io();
  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (newMessage) => {
    store.dispatch(actions.updateCurrentChats(newMessage));
  });

  socket.on('newChannel', (newChannel) => {
    store.dispatch(actions.updateCurrentChannels(newChannel));
    store.dispatch(actions.setActiveChanel(newChannel.name));
    store.dispatch(actions.setActiveChannelId(newChannel.id));
  });

  socket.on('renameChannel', (newChannel) => {
    store.dispatch(actions.renameChannel(newChannel));
  });

  socket.on('removeChannel', (remoteChannel) => {
    store.dispatch(actions.removeChannel(remoteChannel));
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default initApp;
