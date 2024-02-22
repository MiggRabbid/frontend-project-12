import io from 'socket.io-client';
import leoProfanity from 'leo-profanity';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import reducer, { actions } from './slices/index';
import badWords from './locales/badWords';
import { RollbarProvider, I18nProvider, AuthProvider } from './components/Providers/Providers';
import App from './components/App';

const initApp = () => {
  const store = configureStore({
    reducer,
  });

  const ruBadWords = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruBadWords);
  leoProfanity.add(badWords);

  const socket = io();
  socket.on('newMessage', (newMessage) => {
    store.dispatch(actions.updateCurrentChats(newMessage));
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(actions.updateCurrentChannels(newChannel));
  });
  socket.on('renameChannel', (newChannel) => {
    store.dispatch(actions.renameChannel(newChannel));
  });
  socket.on('removeChannel', (remoteChannel) => {
    store.dispatch(actions.deleteChannel(remoteChannel));
  });

  return (
    <RollbarProvider>
      <I18nProvider>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </I18nProvider>
    </RollbarProvider>
  );
};

export default initApp;
