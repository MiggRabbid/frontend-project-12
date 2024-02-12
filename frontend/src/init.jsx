import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as yup from 'yup';
import reducer, { actions } from './slices/index';
import App from './Components/App';
import locale from './locales/locale';
import resources from './locales/index';

const initApp = async () => {
  const defaultLanguage = 'ru';
  const i18nextInstance = await i18n.createInstance();
  const store = configureStore({
    reducer,
  });
  const socket = io();

  await i18nextInstance.use(initReactI18next).init({
    lng: defaultLanguage,
    resources,
  });

  const setYupLocale = () => {
    yup.setLocale(locale);
  };

  setYupLocale(i18nextInstance);

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
