import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '@/locales/en.json';
import it from '@/locales/it.json';
import es from '@/locales/es.json';

const systemLanguage = Localization.getLocales()[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    it: {translation: it},
    es: {translation: es}
  },
  fallbackLng: 'en',
  lng: systemLanguage,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
