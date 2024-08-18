import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation from './ja/translation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof translation
    }
  }
}

i18n.use(initReactI18next).init({
  fallbackLng: 'ja',
  returnNull: false,
  resources: {
    ja: {
      translation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
