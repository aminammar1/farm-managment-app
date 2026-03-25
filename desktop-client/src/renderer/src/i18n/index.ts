import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { ar } from './resources/ar';
import { en } from './resources/en';
import { fr } from './resources/fr';

export const getDirection = (language: string): 'rtl' | 'ltr' => (language === 'ar' ? 'rtl' : 'ltr');

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'fr', 'en'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    resources: {
      ar: { translation: ar },
      fr: { translation: fr },
      en: { translation: en }
    },
    interpolation: {
      escapeValue: false
    }
  });

export { i18n };
