// src/i18n.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

const i18n = createI18n({
  legacy: false, // true si tu veux utiliser l'API Options
  locale: 'fr', // langue par défaut
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

export default i18n
