import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from '../../locales/index';

const I18nProvider = ({ children }) => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.use(initReactI18next).use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });

  return (
    <I18nextProvider i18n={i18nextInstance}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
