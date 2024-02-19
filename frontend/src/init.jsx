import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import leoProfanity from 'leo-profanity';

import reducer, { actions } from './slices/index';
import resources from './locales/index';
import badWords from './locales/badWords.js';
import App from './Components/App';

const initApp = async () => {
  const ruBadWords = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruBadWords);
  leoProfanity.add(badWords);

  const i18nextInstance = await i18n.createInstance();
  const store = configureStore({
    reducer,
  });

  await i18nextInstance.use(initReactI18next).use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

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
    store.dispatch(actions.removeChannel(remoteChannel));
  });

  return (
    <I18nextProvider i18n={i18nextInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};

export default initApp;
